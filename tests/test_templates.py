import json
import re
import shutil
import subprocess
import tempfile
import time
from collections.abc import Iterator
from pathlib import Path

import pytest
import yaml
from jinja2 import Template

commit_pattern = re.compile(r"^_commit: .*", flags=re.MULTILINE)
src_path_pattern = re.compile(r"_src_path: .*")
tests_path = Path(__file__).parent
root = tests_path.parent
generated_folder = "examples"
generated_root = root / generated_folder
DEFAULT_PARAMETERS = {
    "author_name": "None",
    "author_email": "None",
    "python_path": "python",
}

# Below is a patch to replace non static patch component inside the path in package.json
# in react templates this is to be mitigated with orchestration
# functionality implemented on algokit cli
def _update_package_json_paths(package_json_path: Path, project_name: str) -> None:
    if package_json_path.exists():
        with open(package_json_path, encoding="utf-8") as file:
            data = json.load(file)

        def replace_last_path(command: str, new_path: str) -> str:
            parts = command.split(" ")
            parts[-1] = new_path
            return " ".join(parts)

        for key, value in data.get("scripts", {}).items():
            if isinstance(value, str) and "algokit generate client" in value:
                modified_command = replace_last_path(
                    value, f"../{project_name}-contracts"
                )
                data["scripts"][key] = modified_command
                break

        with open(package_json_path, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2)


def generate_fullstack_get_args(
    project_name: str,
    copier_answers: dict[str, str],
) -> dict[str, list[list[str]]]:
    backend = f"projects/{project_name}-contracts"
    frontend = f"projects/{project_name}-frontend"
    check_args = {
        backend: [
            [
                "black",
                "--check",
                "--diff",
                "--config",
                "pyproject.toml",
                ".",
            ],
            [
                "ruff",
                "--diff",
                "--config",
                "pyproject.toml",
                ".",
            ],
        ],
        frontend: [
            ["npm", "install"],
        ],
    }

    if copier_answers["preset_name"] == "production":
        check_args[backend].append(
            [
                "mypy",
                "--ignore-missing-imports",
                ".",
            ]
        )
        check_args[frontend].append(["npm", "run", "lint"])

    return check_args


def get_backend_black_args(config_path: str) -> list[str]:
    return [
        "black",
        "--check",
        "--diff",
        "--config",
        f"{config_path}/pyproject.toml",
        ".",
    ]


def get_backend_ruff_args(config_path: str) -> list[str]:
    return [
        "ruff",
        "--diff",
        "--config",
        f"{config_path}/pyproject.toml",
        ".",
    ]


def get_backend_mypy_args() -> list[str]:
    return [
        "mypy",
        "--ignore-missing-imports",
        ".",
    ]


FRONTEND_NPM_INSTALL_ARGS = ["npm", "install"]
FRONTEND_NPM_LINT_ARGS = ["npm", "run", "lint"]
FRONTEND_NPM_BUILD_ARGS = ["npm", "run", "build"]


def _load_copier_yaml(path: Path) -> dict[str, str | bool | dict]:
    with path.open("r", encoding="utf-8") as stream:
        return yaml.safe_load(stream)


@pytest.fixture(autouse=True, scope="module")
def working_dir() -> Iterator[Path]:
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as temp:
        working_dir = Path(temp) / "template"
        working_generated_root = working_dir / generated_folder
        shutil.copytree(root, working_dir)
        subprocess.run(["git", "add", "-A"], cwd=working_dir)
        subprocess.run(
            ["git", "commit", "-m", "draft changes", "--no-verify"], cwd=working_dir
        )

        yield working_dir

        for src_dir in working_generated_root.iterdir():
            if not src_dir.is_dir():
                continue

            dest_dir = generated_root / src_dir.stem
            shutil.rmtree(dest_dir, ignore_errors=True)
            shutil.copytree(src_dir, dest_dir, dirs_exist_ok=True)


def run_init(
    working_dir: Path,
    test_name: str,
    *args: str,
    template_url: str | None = None,
    template_branch: str | None = None,
    answers: dict[str, str] | None = None,
    child_template_default_answer: str = "no",
) -> subprocess.CompletedProcess:
    copy_to = working_dir / generated_folder / test_name
    project_name = str(copy_to.stem)
    shutil.rmtree(copy_to, ignore_errors=True)
    if template_url is None:
        template_url = str(working_dir)

        if template_branch is None:
            git_output = subprocess.run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=working_dir,
                stdout=subprocess.PIPE,
            )
            template_branch = git_output.stdout.decode("utf-8").strip()

    init_args = [
        "algokit",
        "--verbose",
        "init",
        "--name",
        project_name,
        "--template-url",
        template_url,
        "--UNSAFE-SECURITY-accept-template-url",
        "--defaults",
        "--no-ide",
        "--no-git",
        "--no-bootstrap",
        "--no-workspace",
    ]
    answers = {**DEFAULT_PARAMETERS, **(answers or {})}

    for question, answer in answers.items():
        init_args.extend(["-a", question, answer])
    if template_branch:
        init_args.extend(["--template-url-ref", template_branch])
    init_args.extend(args)

    # Use Popen for interactive input
    process = subprocess.Popen(
        init_args,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=copy_to.parent,
    )

    # Write 'y' to stdin while the process is still running
    while process.poll() is None and process.stdout and process.stdin:
        output = process.stdout.readline().lower()
        print(
            output, end=""
        )  # print stdout in real-time, without adding an extra newline

        if "y/n" in output:  # adjust this as needed based on the exact prompt text
            answer = (
                "y" if "continue anyway?" in output else child_template_default_answer
            )
            process.stdin.write(answer)
            process.stdin.flush()

        time.sleep(0.1)

    # Get the output
    stdout, stderr = process.communicate()

    # Create a CompletedProcess instance
    result = subprocess.CompletedProcess(
        args=process.args,
        returncode=process.returncode,
        stdout=stdout,
        stderr=stderr,
    )

    if result.returncode:
        return result

    package_json_path = (
        copy_to / "projects" / f"{project_name}-frontend" / "package.json"
    )
    _update_package_json_paths(package_json_path, project_name)

    command_checks = generate_fullstack_get_args(project_name, answers)

    for folder, commands in command_checks.items():
        for command in commands:
            print(f"Running {' '.join(command)} in {folder}")
            result = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                cwd=copy_to / folder,
            )
            if result.returncode:
                break

    # if successful, normalize .copier-answers.yml to make observing diffs easier
    copier_answers = Path(copy_to / ".copier-answers.yml")
    content = copier_answers.read_text("utf-8")
    content = commit_pattern.sub("_commit: <commit>", content)
    content = src_path_pattern.sub("_src_path: <src>", content)
    copier_answers.write_text(content, "utf-8")

    return result


def get_answered_questions_from_copier_yaml(
    *,
    contract_template: str = "python",
    preset_name: str = "starter",
    deployment_language: str = "python",
    ide_vscode: bool = True,
    allowed_questions: list[str] | None = None,
) -> dict[str, str]:
    copier_yaml = root / "copier.yaml"
    ignored_keys = {
        "_subdirectory",  # copier setting
        # the following are ignored as they are passed automatically by algokit
        "project_name",
        "preset_name",
        "algod_token",
        "algod_server",
        "algod_port",
        "indexer_token",
        "indexer_server",
        "indexer_port",
    }
    ignored_keys.update(DEFAULT_PARAMETERS)

    questions = _load_copier_yaml(copier_yaml)
    answers = {}

    for question_name, details in questions.items():
        if question_name in ignored_keys:
            continue
        if allowed_questions and question_name not in allowed_questions:
            continue
        if isinstance(details, dict):
            details_type = details["type"]
            if details_type == "str":
                if "default" in details:
                    default_template = Template(details["default"])
                    default_value = default_template.render(preset_name=preset_name)
                    answers[question_name] = default_value.strip()

    answers["preset_name"] = preset_name
    answers["deployment_language"] = deployment_language
    answers["contract_template"] = contract_template
    answers["ide_vscode"] = "yes" if ide_vscode else "no"

    return answers


@pytest.mark.parametrize(
    "contract_template", ["puya", "beaker"]
)  # ["tealscript", "puya", "beaker"])
# TODO: revert upon tealscript and beaker supporting latest
def test_production_preset(contract_template: str, working_dir: Path) -> None:
    response = run_init(
        working_dir,
        f"production_{contract_template}_react",
        answers=get_answered_questions_from_copier_yaml(
            preset_name="production",
            deployment_language="python",
            contract_template=contract_template,
        ),
        child_template_default_answer="y",
    )

    assert response.returncode == 0, response.stdout


@pytest.mark.parametrize(
    "contract_template", ["puya", "beaker"]
)  # ["tealscript", "puya", "beaker"])
# TODO: revert upon tealscript and beaker supporting latest
def test_starter_preset(contract_template: str, working_dir: Path) -> None:
    response = run_init(
        working_dir,
        f"starter_{contract_template}_react",
        answers=get_answered_questions_from_copier_yaml(
            preset_name="starter",
            deployment_language="typescript",
            contract_template=contract_template,
        ),
        child_template_default_answer="n",
    )

    assert response.returncode == 0, response.stdout


# Expand for any specific combinations of parameters
