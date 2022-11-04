export interface TransferManager {
  sendTransfer(request: {
    ibanFrom: number
    ibanTo: number
    amount: number
  }): number
  getTransferList(): [
    number,
    {
      number: string
      at: string
      ibanFrom: string
      ibanTo: string
      amount: string
    }[]
  ]
}
