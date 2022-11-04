import { Horloge } from './Horloge'
import { transaction } from './transaction'
import moment = require('moment')
export default class BankAccount {
  private balance: number
  transactions: transaction[]
  horloge: Horloge
  constructor(money: number = 0, horloge: Horloge = null) {
    this.balance = money
    this.horloge = horloge
    this.transactions = []
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
}

export class overdraftReachedError {}
export class negativeDepositError {}
