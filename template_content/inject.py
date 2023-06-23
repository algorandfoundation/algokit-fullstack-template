import json
import os
import shutil

TYPED_CLIENT_LINKING_COMMAND = {
    "generate:app-clients": "algokit generate client -o src/contracts/{contract_name}.ts ../backend"  # noqa: E501
}
ROOT_DIR = os.getcwd()


def modify_scripts(scripts, new_script, specified_commands):
    """Modifies the existing scripts to run the new script first."""
    # Prepend the new script to the old ones
    combined_scripts = {**new_script, **scripts}

    # Modify only specified old scripts to run the new script first
    for key in scripts.keys():
        if key not in new_script and key in specified_commands:
            combined_scripts[
                key
            ] = f"npm run {list(new_script.keys())[0]} && {combined_scripts[key]}"

    return combined_scripts


def write_back_to_file(file_path, data):
    """Writes the modified package data back to the file."""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)


def inject_npm_script(file_path, new_script, specified_commands):
    """Injects a new script into the existing scripts in a package.json file."""
    # Load the existing package.json file
    with open(file_path) as f:
        data = json.load(f)

    # Check if scripts key exists
    if "scripts" in data:
        # Modify scripts to run the new script first
        data["scripts"] = modify_scripts(
            data["scripts"], new_script, specified_commands
        )

        # Save the modified package.json back to file
        write_back_to_file(file_path, data)
    else:
        print("'scripts' key not found in package.json")


def replace_file(source_file, dest_file):
    """Takes an input file and replaces file at destination with the input"""
    if os.path.isfile(dest_file):
        print(f"File {dest_file} exists and will be replaced.")
    shutil.copy2(source_file, dest_file)


def delete_file(file_path):
    """Deletes a file if it exists."""
    try:
        os.remove(file_path)
        print(f"File {file_path} removed successfully.")
    except OSError as e:
        print(f"Error: {file_path} : {e.strerror}")


def delete_script():
    """Deletes the current script file."""
    delete_file(os.path.realpath(__file__))


if __name__ == "__main__":
    # Specify commands to inject the script into
    specified_commands = ["dev", "build"]

    # Inject linking command into package.json
    package_json_path = os.path.join(ROOT_DIR, "frontend", "package.json")
    inject_npm_script(
        package_json_path, TYPED_CLIENT_LINKING_COMMAND, specified_commands
    )

    # Replace Transact component with example integrating with HelloWorld contract
    source_component = os.path.join(ROOT_DIR, "App.tsx")
    dest_component = os.path.join(ROOT_DIR, "frontend", "src", "App.tsx")
    replace_file(source_component, dest_component)

    # Cleanup
    delete_file(source_component)
    delete_script()
