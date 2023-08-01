import { consoleLogger } from '@algorandfoundation/algokit-utils/types/logging'
import * as algokit from '@algorandfoundation/algokit-utils'
import { deploy as HelloWorldDeployer } from './hello_world/deploy-config'

const contractDeployers = [HelloWorldDeployer]

algokit.Config.configure({
  logger: consoleLogger,
})
;(async () => {
  for (const deployer of contractDeployers) {
    try {
      await deployer()
    } catch (e) {
      console.error(e)
    }
  }
})()
