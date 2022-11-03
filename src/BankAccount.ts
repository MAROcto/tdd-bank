import { transaction } from './transaction'

export default class BankAccount {
  balance: number
  transactions: transaction[]
  constructor(money: number = 0) {
    this.balance = money
    this.transactions = []
  }
  checkBalance(): number {
    return this.balance
  }
  deposit(depositMoney: number): number {
    this.balance += depositMoney
    var transaction = {
      date: new Date().toLocaleDateString(),
      value: depositMoney,
      newBalance: this.balance,
    }
    this.transactions.push(transaction)
    return this.balance
  }

  withdraw(withdrawalMoney: number): number | string {
    if (this.balance - withdrawalMoney < -100) {
      return "Can't have an overdraft over -100"
    } else {
      this.balance -= withdrawalMoney
      return this.balance
    }
  }
}
