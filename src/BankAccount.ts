import { Horloge } from './Horloge'
import { transaction } from './transaction'
import moment = require('moment')
import HorlogeTest from './HorlogeTest'
import { TransferManager } from './TransferManager'
export default class BankAccount {
  private balance: number
  transactions: transaction[]
  horloge: Horloge
  transferManager: TransferManager
  constructor(
    money: number = 0,
    horloge: Horloge = new HorlogeTest([]),
    transferManager: TransferManager = null
  ) {
    this.balance = money
    this.horloge = horloge
    this.transactions = []
    this.transferManager = transferManager
  }
  checkBalance(): number {
    return this.balance
  }
  deposit(depositMoney: number): number | negativeDepositError {
    if (depositMoney < 0) return new negativeDepositError()
    this.balance += depositMoney
    var transaction = {
      date: this.horloge.getDate(),
      value: depositMoney,
      newBalance: this.balance,
    }
    this.transactions.push(transaction)
    return this.balance
  }
  withdraw(amountToWithdraw: number): number | overdraftReachedError {
    if (this.balance - amountToWithdraw < -100) {
      return new overdraftReachedError()
    } else {
      this.balance -= amountToWithdraw
      var transaction = {
        date: this.horloge.getDate(),
        value: -amountToWithdraw,
        newBalance: this.balance,
      }
      this.transactions.push(transaction)
      return this.balance
    }
  }
  transfer(amountToSend: number, receiverIban: number): number {
    const request = {
      ibanFrom: 67890,
      ibanTo: receiverIban,
      amount: amountToSend,
    }
    const response = this.transferManager.sendTransfer(request)
    return response
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
    return this.transferManager.getTransferList()
  }
}

export class overdraftReachedError {}
export class negativeDepositError {}
