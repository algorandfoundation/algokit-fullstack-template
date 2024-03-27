<div align="center">
<a href="https://github.com/algorandfoundation/algokit-fullstack-template"><img src="https://bafybeifu5ylrwvila2jihipfseirzpc5yy7p7l5y2nrjeysajl6aq5np3i.ipfs.nftstorage.link/" width=60%></a>
</div>

<p align="center">
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-cli"><img src="https://img.shields.io/badge/docs-repository-00dc94?logo=github&style=flat.svg" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img src="https://img.shields.io/badge/learn-AlgoKit-00dc94?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-fullstack-template"><img src="https://img.shields.io/github/stars/algorandfoundation/algokit-fullstack-template?color=00dc94&logo=star&style=flat" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Falgorandfoundation%2Falgokit-fullstack-template&countColor=%2300dc94&style=flat" /></a>
</p>

---

This full-stack template provides both a baseline React web app and a production-ready baseline for developing and deploying `Algorand Python`, `TealScript` and `Beaker` smart contracts. It's suitable for developing and integrating with any [ARC32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) compliant Algorand smart contracts.

To use this template, [install AlgoKit](https://github.com/algorandfoundation/algokit-cli#readme) and then either pass in `-t fullstack` to `algokit init` or select the relevant template interactively during `algokit init`.

This is one of the official templates used by AlgoKit to initialize both a frontend React web app and Algorand smart contract project. It's created based on the [Copier templates](https://copier.readthedocs.io/en/stable/).

## Features

This template supports a multitude of features for developing full-stack applications using official AlgoKit templates. Using the full-stack template, currently allows you to create a workspace that combines the following frontend template:

- [algokit-react-frontend-template](https://github.com/algorandfoundation/algokit-react-frontend-template) - A React web app with TypeScript, Tailwind CSS, and all Algorand specific integrations pre configured and ready for you to build.

And the following backend templates:

- [algokit-python-template](https://github.com/algorandfoundation/algokit-python-template) - An official starter for developing and deploying Algorand Python smart contracts.
- [algokit-tealscript-template](https://github.com/algorand-devrel/tealscript-algokit-template) - An official starter for developing and deploying TealScript smart contracts.
- [algokit-beaker-default-template](https://github.com/algorandfoundation/algokit-beaker-default-template) - A production-ready baseline for developing and deploying Beaker smart contracts.

### Frontend

- React web app with [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/)
- Styled framework agnostic CSS components using [DaisyUI](https://daisyui.com/).
- Starter Jest unit tests for TypeScript functions. Can be disabled if not needed.
- Starter [playwright](https://playwright.dev/) tests for end-to-end testing. Can be disabled if not needed.
- Integration with [use-wallet](https://github.com/txnlab/use-wallet) for connecting to Algorand wallets such as Pera, Defly, and Exodus.
- Example of performing a transaction with HelloWorld smart contract.
- dotenv support for environment variables, as well as a local-only KMD provider that can be used for connecting the frontend component to an `algokit localnet` instance (Docker required).
- CI/CD pipelines using GitHub Actions to deploy to Vercel or Netlify

> Refer to the official [algokit-react-frontend-template](https://github.com/algorandfoundation/algokit-react-frontend-template) repository for up-to-date information on the frontend template.

### Backend

- Compilation of multiple `python`, `tealscript`, `beaker` contracts to a predictable folder location and file layout where they can be deployed.
- Deploy-time immutability and permanence control.
- [Poetry](https://python-poetry.org/) for Python dependency management and virtual environment management.
- Linting via [Ruff](https://github.com/charliermarsh/ruff) or [Flake8](https://flake8.pycqa.org/en/latest/).
- Formatting via [Black](https://github.com/psf/black).
- Type checking via [mypy](https://mypy-lang.org/).
- Testing via pytest (not yet used).
- Dependency vulnerability scanning via pip-audit (not yet used).
- VS Code configuration (linting, formatting, breakpoint debugging).
- dotenv (.env) file for configuration.
- Automated testing of the compiled smart contracts.
- [Output stability](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/articles/output_stability.md) tests of the TEAL output. Artifacts folder is also available as standalone `examples` for anyone curious to see default instances of preset projects.
- CI/CD pipeline using GitHub Actions.

> Refer to the respective backend repository mentioned in [features](#features) for up-to-date information.

## Getting started

Once the template is instantiated you can follow the [README.md](template_content/README.md.jinja) file to see instructions for how to use the template.

### Interactive Wizard

**To initialize using the `algokit` CLI**:

- Execute the command `algokit init`. This initiates an interactive wizard that assists in selecting the most appropriate template for your project requirements.

**To initialize within GitHub Codespaces**:

- Follow these steps to leverage GitHub Codespaces for template selection:

  1. Go to the [algokit-base-template](https://github.com/algorandfoundation/algokit-base-template) repository.
  2. Initiate a new codespace by selecting the `Create codespace on main` option. This can be found by clicking the `Code` button, then navigating to the `Codespaces` tab.
  3. Upon codespace preparation, `algokit` will automatically start `LocalNet` and present a prompt with the next steps. Executing `algokit init` will initiate the interactive wizard.
