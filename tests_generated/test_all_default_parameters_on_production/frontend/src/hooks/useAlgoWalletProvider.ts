import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { AlgodClientOptions, defly, exodus, kmd, pera, PROVIDER_ID, reconnectProviders, WalletClient } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { useEffect } from 'react'

type SupportedProviders = Partial<{
  kmd: WalletClient | null
  pera: WalletClient | null // ok
  myalgo: WalletClient | null
  algosigner: WalletClient | null
  defly: WalletClient | null // ok
  exodus: WalletClient | null // ok
  walletconnect: WalletClient | null
  mnemonic: WalletClient | null
}>

let providerIds: PROVIDER_ID[] = []
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  providerIds.push(PROVIDER_ID.KMD)
} else {
  providerIds = [PROVIDER_ID.PERA, PROVIDER_ID.DEFLY, PROVIDER_ID.EXODUS]
}
const walletProviders: Partial<SupportedProviders> = {}

export function useAlgoWallet(context: { autoConnect: boolean; network: string; nodeServer: string; nodePort: string; nodeToken: string }) {
  const algodOptions = [context.nodeToken, context.nodeServer, context.nodePort] as AlgodClientOptions

  const network = context.network

  providerIds.forEach(async (id) => {
    if (Object.keys(walletProviders).includes(id)) {
      return
    } else {
      switch (id) {
        case PROVIDER_ID.PERA:
          walletProviders[id] = await pera.init({
            algosdkStatic: algosdk,
            clientStatic: PeraWalletConnect,
            clientOptions: {
              shouldShowSignTxnToast: true,
            },
            algodOptions: algodOptions,
            network: network,
          })
          break

        case PROVIDER_ID.DEFLY:
          walletProviders[id] = await defly.init({
            algosdkStatic: algosdk,
            clientStatic: DeflyWalletConnect,
            algodOptions: algodOptions,
            network: network,
          })
          break

        case PROVIDER_ID.EXODUS:
          walletProviders[id] = await exodus.init({
            algosdkStatic: algosdk,
            algodOptions: algodOptions,
            network: network,
          })
          break

        // // For WalletConnect, you need to provide your own clientStatic and clientOptions
        // // Refer to https://github.com/TxnLab/use-wallet for integration instructions
        // case PROVIDER_ID.WALLETCONNECT:
        //   walletProviders[id] = await walletconnect.init({
        //     algosdkStatic: algosdk,
        //     clientStatic: WalletConnectModalSign,
        //     clientOptions: {
        //       relayUrl: 'wss://relay.walletconnect.com',
        //       projectId: '{YOUR_PROJECT_ID}',
        //       metadata: {
        //         name: 'AlgoKit React Starter',
        //         description: 'AlgoKit React Starter web app',
        //         url: '#',
        //         icons: ['https://algorand.com/assets/media-kit/logos/logo-marks/png/algorand_logo_mark_white.png'],
        //       },
        //     },
        //     algodOptions: algodOptions,
        //     network: network,
        //   })
        //   break

        default:
          if (import.meta.env.VITE_ALGOD_NETWORK === '') {
            walletProviders[PROVIDER_ID.KMD] = await kmd.init({
              algosdkStatic: algosdk,
              algodOptions: algodOptions,
              network: network,
            })
          }
      }
    }
  })

  useEffect(() => {
    const reconnect = async (walletProviders: SupportedProviders) => {
      await reconnectProviders(walletProviders)
    }

    if (context.autoConnect) {
      reconnect(walletProviders)
    }
  }, [])

  return {
    walletProviders,
  }
}
