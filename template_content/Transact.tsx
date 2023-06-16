import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { DEFAULT_NODE_BASEURL, DEFAULT_NODE_PORT, DEFAULT_NODE_TOKEN, useWallet } from '@txnlab/use-wallet'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { HelloWorldAppClient } from '../contracts/HelloWorldApp'

interface TransactInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [contractInput, setContractInput] = useState<string>('')

  const algodClient = algokit.getAlgoClient({
    server: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER ?? DEFAULT_NODE_BASEURL,
    port: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT ?? DEFAULT_NODE_PORT,
    token: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN ?? DEFAULT_NODE_TOKEN,
  })

  const indexer = algokit.getAlgoIndexerClient({
    server: import.meta.env.VITE_INDEXER_SERVER,
    port: import.meta.env.VITE_INDEXER_PORT,
    token: import.meta.env.VITE_INDEXER_TOKEN,
  })

  const { enqueueSnackbar } = useSnackbar()
  const { signer, activeAddress } = useWallet()

  const sendHelloWordAppCall = async () => {
    setLoading(true)

    const appDetails = {
      resolveBy: 'creatorAndName',
      sender: { signer, addr: activeAddress } as TransactionSignerAccount,
      creatorAddress: activeAddress,
      findExistingUsing: indexer,
    } as AppDetails

    const appClient = new HelloWorldAppClient(appDetails, algodClient)
    const isLocal = await algokit.isLocalNet(algodClient)

    await appClient.deploy({
      allowDelete: isLocal,
      allowUpdate: isLocal,
      onSchemaBreak: isLocal ? 'replace' : 'fail',
      onUpdate: isLocal ? 'update' : 'fail',
    })

    const response = await appClient.hello({ name: contractInput })

    enqueueSnackbar(`Response from the contract: ${response.return}`, { variant: 'success' })
    setLoading(false)
  }

  return (
    <dialog id="transact_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Say hello to your Algorand smart contract</h3>
        <br />
        <input
          type="text"
          placeholder="Provide input to hello function"
          className="input input-bordered w-full"
          value={contractInput}
          onChange={(e) => {
            setContractInput(e.target.value)
          }}
        />
        <div className="modal-action ">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button className={`btn`} onClick={sendHelloWordAppCall}>
            {loading ? <span className="loading loading-spinner" /> : 'Send application call'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default Transact
