<div align="center">
<a href="https://github.com/algorandfoundation/algokit-fullstack-template"><img src="https://bafybeifu5ylrwvila2jihipfseirzpc5yy7p7l5y2nrjeysajl6aq5np3i.ipfs.nftstorage.link/" width=60%></a>
</div>

<p align="center">
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-cli"><img src="https://img.shields.io/badge/docs-repository-00dc94?logo=github&style=flat.svg" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img src="https://img.shields.io/badge/learn-AlgoKit-00dc94?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-fullstack-template"><img src="https://img.shields.io/github/stars/algorandfoundation/algokit-fullstack-template?color=00dc94&logo=star&style=flat" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img  src="https://vbr.wocr.tk/badge?page_id=algorandfoundation%2Falgokit-fullstack-template&color=%2300dc94&style=flat" /></a>
</p>

---

This full-stack template provides both a baseline React web app and a production-ready baseline for developing and deploying [Beaker](https://github.com/algorand-devrel/beaker) smart contracts. It's suitable for developing and integrating with any [ARC32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) compliant Algorand smart contracts.

To use this template, [install AlgoKit](https://github.com/algorandfoundation/algokit-cli#readme) and then either pass in `-t fullstack` to `algokit init` or select the relevant template interactively during `algokit init`.

This is one of the official templates used by AlgoKit to initialize both a frontend React web app and Algorand smart contract project. It's created based on the [Copier templates](https://copier.readthedocs.io/en/stable/).

## Features

This template supports a multitude of features for both frontend and backend:

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

- Compilation of multiple Beaker contracts to a predictable folder location and file layout where they can be deployed.
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
- [Output stability](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/articles/output_stability.md) tests of the TEAL output.
- CI/CD pipeline using GitHub Actions.

> Refer to the official [algokit-beaker-template](https://github.com/algorandfoundation/algokit-beaker-default-template) repository for up-to-date information on the backend template.

# Getting started

Once the template is instantiated you can follow the [README.md](template_content/README.md.jinja) file to see instructions for how to use the template.
