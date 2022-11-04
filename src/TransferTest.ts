import { TransferManager } from './TransferManager'

export default class TransferTest implements TransferManager {
  shouldSucced: boolean
  transferList: {
    number: string
    at: string
    ibanFrom: string
    ibanTo: string
    amount: string
  }[]
  constructor(
    shouldSucced: boolean,
    transferList: {
      number: string
      at: string
      ibanFrom: string
      ibanTo: string
      amount: string
    }[] = []
  ) {
    this.shouldSucced = shouldSucced
    this.transferList = transferList
  }
  sendTransfer(request: {
    ibanFrom: number
    ibanTo: number
    amount: number
  }): number {
    return this.shouldSucced ? 202 : 400
  }
  getTransferList(): [
    number,
    {
      number: string
      at: string
      ibanFrom: string
      ibanTo: string
      amount: string
    }[]
  ] {
    return [202, this.transferList]
  }
}
