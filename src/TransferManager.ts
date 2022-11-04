export interface TransferManager {
  sendTransfer(request: {
    ibanFrom: number
    ibanTo: number
    amount: number
  }): number
}
