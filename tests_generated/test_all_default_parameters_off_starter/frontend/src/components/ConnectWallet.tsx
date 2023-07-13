import { useWallet } from '@txnlab/use-wallet'
import Account from './Account'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { providers, activeAddress } = useWallet()

  return (
    <dialog id="connect_wallet_modal" className={`modal ${openModal ? 'modal-open' : ''}`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-2xl">Select wallet provider</h3>

        <div className="grid m-2 pt-5">
          {activeAddress && (
            <>
              <Account />
              <div className="divider" />
            </>
          )}

          {!activeAddress &&
            providers?.map((provider) => (
              <button
                data-test-id={`${provider.metadata.id}-connect`}
                className="btn border-teal-800 border-1  m-2"
                key={`provider-${provider.metadata.id}`}
                onClick={() => {
                  return provider.connect()
                }}
              >
                <img
                  alt={`wallet_icon_${provider.metadata.id}`}
                  src={provider.metadata.icon}
                  style={{ objectFit: 'contain', width: '30px', height: 'auto' }}
                />
                <span>{provider.metadata.name.toLowerCase() === 'kmd' ? 'LocalNet Wallet' : provider.metadata.name}</span>
              </button>
            ))}
        </div>

        <div className="modal-action ">
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={() => {
              closeModal()
            }}
          >
            Close
          </button>
          {activeAddress && (
            <button
              className="btn btn-warning"
              data-test-id="logout"
              onClick={() => {
                providers?.find((p) => p.isActive)?.disconnect()
              }}
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}
export default ConnectWallet
