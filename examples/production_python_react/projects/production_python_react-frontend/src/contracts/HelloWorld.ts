/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^7
 */
import { AlgorandClientInterface } from '@algorandfoundation/algokit-utils/types/algorand-client-interface'
import { ABIReturn, AppReturn, SendAppTransactionResult } from '@algorandfoundation/algokit-utils/types/app'
import { Arc56Contract, getArc56ReturnValue, getABIStructFromABITuple } from '@algorandfoundation/algokit-utils/types/app-arc56'
import {
  AppClient as _AppClient,
  AppClientMethodCallParams,
  AppClientParams,
  AppClientBareCallParams,
  CallOnComplete,
  AppClientCompilationParams,
  ResolveAppClientByCreatorAndName,
  ResolveAppClientByNetwork,
  CloneAppClientParams,
} from '@algorandfoundation/algokit-utils/types/app-client'
import { AppFactory as _AppFactory, AppFactoryAppClientParams, AppFactoryResolveAppClientByCreatorAndNameParams, AppFactoryDeployParams, AppFactoryParams, CreateSchema } from '@algorandfoundation/algokit-utils/types/app-factory'
import { TransactionComposer, AppCallMethodCall, AppMethodCallTransactionArgument, SimulateOptions, RawSimulateOptions, SkipSignaturesSimulateOptions } from '@algorandfoundation/algokit-utils/types/composer'
import { SendParams, SendSingleTransactionResult, SendAtomicTransactionComposerResults } from '@algorandfoundation/algokit-utils/types/transaction'
import { Address, encodeAddress, modelsv2, OnApplicationComplete, Transaction, TransactionSigner } from 'algosdk'
import SimulateResponse = modelsv2.SimulateResponse

export const APP_SPEC: Arc56Contract = {"arcs":[],"name":"HelloWorld","structs":{},"methods":[{"name":"hello","args":[{"name":"name","type":"string"}],"returns":{"type":"string"},"events":[],"actions":{"create":[],"call":["NoOp"]}}],"state":{"schema":{"global":{"ints":0,"bytes":0},"local":{"ints":0,"bytes":0}},"keys":{"global":{},"local":{},"box":{}},"maps":{"global":{},"local":{},"box":{}}},"source":{"approval":"I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuaGVsbG9fd29ybGQuY29udHJhY3QuSGVsbG9Xb3JsZC5hcHByb3ZhbF9wcm9ncmFtOgogICAgaW50Y2Jsb2NrIDAgMQogICAgY2FsbHN1YiBfX3B1eWFfYXJjNF9yb3V0ZXJfXwogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLmhlbGxvX3dvcmxkLmNvbnRyYWN0LkhlbGxvV29ybGQuX19wdXlhX2FyYzRfcm91dGVyX18oKSAtPiB1aW50NjQ6Cl9fcHV5YV9hcmM0X3JvdXRlcl9fOgogICAgLy8gc21hcnRfY29udHJhY3RzL2hlbGxvX3dvcmxkL2NvbnRyYWN0LnB5OjUKICAgIC8vIGNsYXNzIEhlbGxvV29ybGQoQVJDNENvbnRyYWN0KToKICAgIHByb3RvIDAgMQogICAgdHhuIE51bUFwcEFyZ3MKICAgIGJ6IF9fcHV5YV9hcmM0X3JvdXRlcl9fX2JhcmVfcm91dGluZ0A1CiAgICBwdXNoYnl0ZXMgMHgwMmJlY2UxMSAvLyBtZXRob2QgImhlbGxvKHN0cmluZylzdHJpbmciCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBfX3B1eWFfYXJjNF9yb3V0ZXJfX19oZWxsb19yb3V0ZUAyCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19oZWxsb19yb3V0ZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2hlbGxvX3dvcmxkL2NvbnRyYWN0LnB5OjYKICAgIC8vIEBhYmltZXRob2QoKQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBub3QgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvaGVsbG9fd29ybGQvY29udHJhY3QucHk6NQogICAgLy8gY2xhc3MgSGVsbG9Xb3JsZChBUkM0Q29udHJhY3QpOgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9oZWxsb193b3JsZC9jb250cmFjdC5weTo2CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIGNhbGxzdWIgaGVsbG8KICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2JhcmVfcm91dGluZ0A1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2hlbGxvX3dvcmxkL2NvbnRyYWN0LnB5OjUKICAgIC8vIGNsYXNzIEhlbGxvV29ybGQoQVJDNENvbnRyYWN0KToKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGJueiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19hZnRlcl9pZl9lbHNlQDkKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAhCiAgICBhc3NlcnQgLy8gY2FuIG9ubHkgY2FsbCB3aGVuIGNyZWF0aW5nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvaGVsbG9fd29ybGQvY29udHJhY3QucHk6NQogICAgLy8gY2xhc3MgSGVsbG9Xb3JsZChBUkM0Q29udHJhY3QpOgogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5oZWxsb193b3JsZC5jb250cmFjdC5IZWxsb1dvcmxkLmhlbGxvKG5hbWU6IGJ5dGVzKSAtPiBieXRlczoKaGVsbG86CiAgICAvLyBzbWFydF9jb250cmFjdHMvaGVsbG9fd29ybGQvY29udHJhY3QucHk6Ni03CiAgICAvLyBAYWJpbWV0aG9kKCkKICAgIC8vIGRlZiBoZWxsbyhzZWxmLCBuYW1lOiBTdHJpbmcpIC0+IFN0cmluZzoKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2hlbGxvX3dvcmxkL2NvbnRyYWN0LnB5OjgKICAgIC8vIHJldHVybiAiSGVsbG8sICIgKyBuYW1lCiAgICBwdXNoYnl0ZXMgIkhlbGxvLCAiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgcmV0c3ViCg==","clear":"I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuaGVsbG9fd29ybGQuY29udHJhY3QuSGVsbG9Xb3JsZC5jbGVhcl9zdGF0ZV9wcm9ncmFtOgogICAgcHVzaGludCAxIC8vIDEKICAgIHJldHVybgo="},"bareActions":{"create":["NoOp"],"call":[]}} as unknown as Arc56Contract

/**
 * A state record containing binary data
 */
export interface BinaryState {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array | undefined
  /**
   * Gets the state value as a string
   */
  asString(): string | undefined
}

class BinaryStateValue implements BinaryState {
  constructor(private value: Uint8Array | undefined) {}

  asByteArray(): Uint8Array | undefined {
    return this.value
  }

  asString(): string | undefined {
    return this.value !== undefined ? Buffer.from(this.value).toString('utf-8') : undefined
  }
}

/**
 * Expands types for IntelliSense so they are more human readable
 * See https://stackoverflow.com/a/69288824
 */
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
    ? { [K in keyof O]: O[K] }
    : never


/**
 * The argument types for the HelloWorld contract
 */
export type HelloWorldArgs = {
  /**
   * The object representation of the arguments for each method
   */
  obj: {
    'hello(string)string': {
      name: string
    }
  }
  /**
   * The tuple representation of the arguments for each method
   */
  tuple: {
    'hello(string)string': [name: string]
  }
}

/**
 * The return type for each method
 */
export type HelloWorldReturns = {
  'hello(string)string': string
}

/**
 * Defines the types of available calls and state of the HelloWorld smart contract.
 */
export type HelloWorldTypes = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'hello(string)string' | 'hello', {
      argsObj: HelloWorldArgs['obj']['hello(string)string']
      argsTuple: HelloWorldArgs['tuple']['hello(string)string']
      returns: HelloWorldReturns['hello(string)string']
    }>
}

/**
 * Defines the possible abi call signatures.
 */
export type HelloWorldSignatures = keyof HelloWorldTypes['methods']
/**
 * Defines the possible abi call signatures for methods that return a non-void value.
 */
export type HelloWorldNonVoidMethodSignatures = keyof HelloWorldTypes['methods'] extends infer T ? T extends keyof HelloWorldTypes['methods'] ? MethodReturn<T> extends void ? never : T  : never : never
/**
 * Defines an object containing all relevant parameters for a single call to the contract.
 */
export type CallParams<TArgs> = Expand<
  Omit<AppClientMethodCallParams, 'method' | 'args' | 'onComplete'> &
    {
      /** The args for the ABI method call, either as an ordered array or an object */
      args: Expand<TArgs>
    }
>
/**
 * Maps a method signature from the HelloWorld smart contract to the method's arguments in either tuple or struct form
 */
export type MethodArgs<TSignature extends HelloWorldSignatures> = HelloWorldTypes['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the HelloWorld smart contract to the method's return type
 */
export type MethodReturn<TSignature extends HelloWorldSignatures> = HelloWorldTypes['methods'][TSignature]['returns']


/**
 * Defines supported create method params for this smart contract
 */
export type HelloWorldCreateCallParams =
  | Expand<AppClientBareCallParams & {method?: undefined} & {onComplete?: OnApplicationComplete.NoOpOC} & CreateSchema>
/**
 * Defines arguments required for the deploy method.
 */
export type HelloWorldDeployParams = Expand<Omit<AppFactoryDeployParams, 'createParams' | 'updateParams' | 'deleteParams'> & {
  /**
   * Create transaction parameters to use if a create needs to be issued as part of deployment; use `method` to define ABI call (if available) or leave out for a bare call (if available)
   */
  createParams?: HelloWorldCreateCallParams
}>


/**
 * Exposes methods for constructing `AppClient` params objects for ABI calls to the HelloWorld smart contract
 */
export abstract class HelloWorldParamsFactory {
  /**
   * Constructs a no op call for the hello(string)string ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static hello(params: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']> & CallOnComplete): AppClientMethodCallParams & CallOnComplete {
    return {
      ...params,
      method: 'hello(string)string' as const,
      args: Array.isArray(params.args) ? params.args : [params.args.name],
    }
  }
}

/**
 * A factory to create and deploy one or more instance of the HelloWorld smart contract and to create one or more app clients to interact with those (or other) app instances
 */
export class HelloWorldFactory {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  public readonly appFactory: _AppFactory

  /**
   * Creates a new instance of `HelloWorldFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params: Omit<AppFactoryParams, 'appSpec'>) {
    this.appFactory = new _AppFactory({
      ...params,
      appSpec: APP_SPEC,
    })
  }
  
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  public get appName() {
    return this.appFactory.appName
  }
  
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC
  }
  
  /** A reference to the underlying `AlgorandClient` this app factory is using. */
  public get algorand(): AlgorandClientInterface {
    return this.appFactory.algorand
  }
  
  /**
   * Returns a new `AppClient` client for an app instance of the given ID.
   *
   * Automatically populates appName, defaultSender and source maps from the factory
   * if not specified in the params.
   * @param params The parameters to create the app client
   * @returns The `AppClient`
   */
  public getAppClientById(params: AppFactoryAppClientParams) {
    return new HelloWorldClient(this.appFactory.getAppClientById(params))
  }
  
  /**
   * Returns a new `AppClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   *
   * Automatically populates appName, defaultSender and source maps from the factory
   * if not specified in the params.
   * @param params The parameters to create the app client
   * @returns The `AppClient`
   */
  public async getAppClientByCreatorAndName(
    params: AppFactoryResolveAppClientByCreatorAndNameParams,
  ) {
    return new HelloWorldClient(await this.appFactory.getAppClientByCreatorAndName(params))
  }

  /**
   * Idempotently deploys the HelloWorld smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public async deploy(params: HelloWorldDeployParams = {}) {
    const result = await this.appFactory.deploy({
      ...params,
    })
    return { result: result.result, appClient: new HelloWorldClient(result.appClient) }
  }

  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  readonly params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the HelloWorld smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The params for a create call
       */
      bare: (params?: Expand<AppClientBareCallParams & AppClientCompilationParams & CreateSchema & {onComplete?: OnApplicationComplete.NoOpOC}>) => {
        return this.appFactory.params.bare.create(params)
      },
    },

  }

  /**
   * Create transactions for the current app
   */
  readonly createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the HelloWorld smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The transaction for a create call
       */
      bare: (params?: Expand<AppClientBareCallParams & AppClientCompilationParams & CreateSchema & {onComplete?: OnApplicationComplete.NoOpOC}>) => {
        return this.appFactory.createTransaction.bare.create(params)
      },
    },

  }

  /**
   * Send calls to the current app
   */
  readonly send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the HelloWorld smart contract using a bare call.
       *
       * @param params The params for the bare (raw) call
       * @returns The create result
       */
      bare: async (params?: Expand<AppClientBareCallParams & AppClientCompilationParams & CreateSchema & SendParams & {onComplete?: OnApplicationComplete.NoOpOC}>) => {
        const result = await this.appFactory.send.bare.create(params)
        return { result: result.result, appClient: new HelloWorldClient(result.appClient) }
      },
    },

  }

}
/**
 * A client to make calls to the HelloWorld smart contract
 */
export class HelloWorldClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  public readonly appClient: _AppClient

  /**
   * Creates a new instance of `HelloWorldClient`
   *
   * @param appClient An `AppClient` instance which has been created with the HelloWorld app spec
   */
  constructor(appClient: _AppClient)
  /**
   * Creates a new instance of `HelloWorldClient`
   *
   * @param params The parameters to initialise the app client with
   */
  constructor(params: Omit<AppClientParams, 'appSpec'>)
  constructor(appClientOrParams: _AppClient | Omit<AppClientParams, 'appSpec'>) {
    this.appClient = appClientOrParams instanceof _AppClient ? appClientOrParams : new _AppClient({
      ...appClientOrParams,
      appSpec: APP_SPEC,
    })
  }
  
  /**
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue<TSignature extends HelloWorldNonVoidMethodSignatures>(method: TSignature, returnValue: ABIReturn | undefined) {
    return returnValue !== undefined ? getArc56ReturnValue<MethodReturn<TSignature>>(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : undefined
  }
  
  /**
   * Returns a new `HelloWorldClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  public static async fromCreatorAndName(params: Omit<ResolveAppClientByCreatorAndName, 'appSpec'>): Promise<HelloWorldClient> {
    return new HelloWorldClient(await _AppClient.fromCreatorAndName({...params, appSpec: APP_SPEC}))
  }
  
  /**
   * Returns an `HelloWorldClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(
    params: Omit<ResolveAppClientByNetwork, 'appSpec'>
  ): Promise<HelloWorldClient> {
    return new HelloWorldClient(await _AppClient.fromNetwork({...params, appSpec: APP_SPEC}))
  }
  
  /** The ID of the app instance this client is linked to. */
  public get appId() {
    return this.appClient.appId
  }
  
  /** The app address of the app instance this client is linked to. */
  public get appAddress() {
    return this.appClient.appAddress
  }
  
  /** The name of the app. */
  public get appName() {
    return this.appClient.appName
  }
  
  /** The ARC-56 app spec being used */
  public get appSpec() {
    return this.appClient.appSpec
  }
  
  /** A reference to the underlying `AlgorandClient` this app client is using. */
  public get algorand(): AlgorandClientInterface {
    return this.appClient.algorand
  }

  /**
   * Get parameters to create transactions for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  readonly params = {
    /**
     * Makes a clear_state call to an existing instance of the HelloWorld smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params?: Expand<AppClientBareCallParams>) => {
      return this.appClient.params.bare.clearState(params)
    },

    /**
     * Makes a call to the HelloWorld smart contract using the `hello(string)string` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    hello: (params: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']> & {onComplete?: OnApplicationComplete.NoOpOC}) => {
      return this.appClient.params.call(HelloWorldParamsFactory.hello(params))
    },

  }

  /**
   * Create transactions for the current app
   */
  readonly createTransaction = {
    /**
     * Makes a clear_state call to an existing instance of the HelloWorld smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params?: Expand<AppClientBareCallParams>) => {
      return this.appClient.createTransaction.bare.clearState(params)
    },

    /**
     * Makes a call to the HelloWorld smart contract using the `hello(string)string` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    hello: (params: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']> & {onComplete?: OnApplicationComplete.NoOpOC}) => {
      return this.appClient.createTransaction.call(HelloWorldParamsFactory.hello(params))
    },

  }

  /**
   * Send calls to the current app
   */
  readonly send = {
    /**
     * Makes a clear_state call to an existing instance of the HelloWorld smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params?: Expand<AppClientBareCallParams & SendParams>) => {
      return this.appClient.send.bare.clearState(params)
    },

    /**
     * Makes a call to the HelloWorld smart contract using the `hello(string)string` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    hello: async (params: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']> & SendParams & {onComplete?: OnApplicationComplete.NoOpOC}) => {
      const result = await this.appClient.send.call(HelloWorldParamsFactory.hello(params))
      return {...result, return: result.return as undefined | HelloWorldReturns['hello(string)string']}
    },

  }

  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
   * @returns A new app client with the altered params
   */
  public clone(params: CloneAppClientParams) {
    return new HelloWorldClient(this.appClient.clone(params))
  }

  /**
   * Methods to access state for the current HelloWorld app
   */
  state = {
  }

  public newGroup(): HelloWorldComposer {
    const client = this
    const composer = this.algorand.newGroup()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: ABIReturn | undefined) => any)> = []
    return {
      /**
       * Add a hello(string)string method call against the HelloWorld contract
       */
      hello(params: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']> & {onComplete?: OnApplicationComplete.NoOpOC}) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.hello(params)))
        resultMappers.push((v) => client.decodeReturnValue('hello(string)string', v))
        return this
      },
      /**
       * Add a clear state call to the HelloWorld contract
       */
      clearState(params: AppClientBareCallParams) {
        promiseChain = promiseChain.then(() => composer.addAppCall(client.params.clearState(params)))
        return this
      },
      addTransaction(txn: Transaction, signer?: TransactionSigner) {
        promiseChain = promiseChain.then(() => composer.addTransaction(txn, signer))
        return this
      },
      async composer() {
        await promiseChain
        return composer
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await (!options ? composer.simulate() : composer.simulate(options))
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val) : val.returnValue)
        }
      },
      async send(params?: SendParams) {
        await promiseChain
        const result = await composer.send(params)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val) : val.returnValue)
        }
      }
    } as unknown as HelloWorldComposer
  }
}
export type HelloWorldComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the hello(string)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  hello(params?: CallParams<HelloWorldArgs['obj']['hello(string)string'] | HelloWorldArgs['tuple']['hello(string)string']>): HelloWorldComposer<[...TReturns, HelloWorldReturns['hello(string)string'] | undefined]>

  /**
   * Makes a clear_state call to an existing instance of the HelloWorld smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(params?: AppClientBareCallParams): HelloWorldComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn A transaction to add to the transaction group
   * @param signer The optional signer to use when signing this transaction.
   */
  addTransaction(txn: Transaction, signer?: TransactionSigner): HelloWorldComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  composer(): TransactionComposer
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(): Promise<HelloWorldComposerResults<TReturns> & { simulateResponse: SimulateResponse }>
  simulate(options: SkipSignaturesSimulateOptions): Promise<HelloWorldComposerResults<TReturns> & { simulateResponse: SimulateResponse }>
  simulate(options: RawSimulateOptions): Promise<HelloWorldComposerResults<TReturns> & { simulateResponse: SimulateResponse }>
  /**
   * Sends the transaction group to the network and returns the results
   */
  send(params?: SendParams): Promise<HelloWorldComposerResults<TReturns>>
}
export type HelloWorldComposerResults<TReturns extends [...any[]]> = Expand<SendAtomicTransactionComposerResults & {
  returns: TReturns
}>

