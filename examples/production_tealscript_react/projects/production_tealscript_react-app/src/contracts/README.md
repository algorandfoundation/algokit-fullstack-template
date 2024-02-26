## How to add new Algorand smart contracts into the frontend project?

The following folder is reserved for the Algorand Application Clients. The clients are used to interact with instances of Algorand Smart Contracts (ASC1s) deployed on-chain.

When you initially create your project, the frontend starter automatically compiles (see [`generate:app-clients`](../../package.json)) the default `hello_world` contract as `HelloWorldClient` and provides the [`AppCalls.tsx`](../components/AppCalls.tsx) component showcasing how to interact with that application client.

After you create or edit a contract in your contracts project and run a build (so that it's available under the `artifacts` folder), you'll need to run `npm run build` in this project to:

1. Generate new typed clients based on all contracts currently available under `artifacts` folder.
2. Copy the typed clients into this folder (`src/contracts`).

Afterwards you are free to use the newly generated clients in your frontend code (such as using them in your custom components, functions and etc) as you wish.
