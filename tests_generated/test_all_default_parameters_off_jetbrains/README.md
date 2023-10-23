# test_all_default_parameters_off_jetbrains

This starter full stack project has been generated using AlgoKit. See below for default getting started instructions.

## Setup

### Initial setup

1. Clone this repository locally.
2. Install pre-requisites:
   - Make sure to have [Docker](https://www.docker.com/) installed and running on your machine.
   - Install `AlgoKit` - [Link](https://github.com/algorandfoundation/algokit-cli#install): The minimum required version is `1.3.0`. Ensure you can execute `algokit --version` and get `1.3.0` or later.
   - Bootstrap your local environment; run `algokit bootstrap all` within this folder, which will install Poetry, run `npm install` and `poetry install` in the root directory to install NPM and Python packages respectively, set up a `.venv` folder with a Python virtual environment and also install all Python dependencies.
     - For TypeScript projects, it will also run `npm install` to install NPM packages.
     - For all projects, it will copy `.env.template` to `.env`.
   - Run `algokit localnet start` to start a local Algorand network in Docker. If you are using VS Code launch configurations provided by the template, this will be done automatically for you.
3. Open the project and start debugging / developing on:
   - [Backend](backend/README.md) - Refer to the README for more information on how to work with smart contracts.
   - [Frontend](frontend/README.md) - Refer to the README for more information on how to work with the frontend application.


### Subsequently

1. If you update to the latest source code and there are new dependencies, you will need to run `algokit bootstrap all` again.
2. Follow step 3 above.

## Tools

This project makes use of Python and React to build Algorand smart contracts and to provide a base project configuration to develop frontends for your Algorand dApps and interactions with smart contracts. The following tools are in use:

- Algorand, AlgoKit, and AlgoKit Utils
- Python dependencies including Poetry, Black, Ruff or Flake8, mypy, pytest, and pip-audit
- React and related dependencies including AlgoKit Utils, Tailwind CSS, daisyUI, use-wallet, npm, jest, playwright, Prettier, ESLint, and Github Actions workflows for build validation

### JetBrains IDEs

It has also been configured to have a productive dev experience out of the box in [JetBrains IDEs](https://www.jetbrains.com/products/), see the [backend .idea](./backend/.idea) and [frontend .idea](./frontend/.idea) folders as well as respective README.md files for more details. Please note, the backend project `runConfigurations` has been optimized and tested on `Pycharm CE` while the frontend project `runConfigurations` is aimed at `WebStorm`. While `PyCharm CE` is available for free, `WebStorm` is a paid product. If you are a student, you can get a free license for `WebStorm` [here](https://www.jetbrains.com/community/education/#students).

## Integrating with smart contracts and application clients

Refer to the [backend](backend/README.md) folder for overview of working with smart contracts, [frontend](frontend/README.md) for overview of the React project and the [frontend/contracts](frontend/src/contracts/README.md) folder for README on adding new smart contracts from backend as application clients on your frontend. The templates provided in these folders will help you get started.
When you compile and generate smart contract artifacts, your frontend component will automatically generate typescript application clients from smart contract artifacts and move them to `frontend/src/contracts` folder, see [`generate:app-clients` in package.json](frontend/package.json). Afterwards, you are free to import and use them in your frontend application.

The frontend starter also provides an example of interactions with your HelloWorldClient in [`AppCalls.tsx`](frontend/src/components/AppCalls.tsx) component by default.

## Next Steps

You can take this project and customize it to build your own decentralized applications on Algorand. Make sure to understand how to use AlgoKit and how to write smart contracts for Algorand before you start.
