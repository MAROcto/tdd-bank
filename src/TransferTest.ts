import { TransferManager } from './TransferManager'

export default class TransferTest implements TransferManager {
  shouldSucced: boolean
  constructor(shouldSucced: boolean) {
    this.shouldSucced = shouldSucced
  }
  sendTransfer(request: {
    ibanFrom: number
    ibanTo: number
    amount: number
  }): number {
    return this.shouldSucced ? 202 : 400
  }
}
