const moment = require('moment')
import bankAccount, {
  overdraftReachedError,
  negativeDepositError,
} from '../src/BankAccount'
import ChoicePicker from '../src/ChoicePicker'
import HorlogeTest from '../src/HorlogeTest'

describe('bankAccount', () => {
  describe('checkBalance', () => {
    test('Consult bank account created whith no money. Expect 0', () => {
      //Given
      const account = new bankAccount()
      const emptyBalance = 0
      //When
      const currentMoney = account.checkBalance()
      //Then
      expect(currentMoney).toBe(emptyBalance)
    })

    test('Consult bank account created with 1000. Expect 1000', () => {
      //Given
      const startingBalance = 1000
      const account = new bankAccount(startingBalance)
      //When
      const currentMoney = account.checkBalance()
      //Then
      expect(currentMoney).toBe(startingBalance)
    })
  })

  describe('deposit', () => {
    test('Deposit of 1000 to a bank account with 100 money. Expect 1100', () => {
      //Given
      const depositMoney = 1000
      const startingBalance = 100
      const horloge = new HorlogeTest([])
      const account = new bankAccount(startingBalance, horloge)
      const expectedBalance = depositMoney + startingBalance
      //When
      const returnedBalance = account.deposit(depositMoney)
      //Then
      expect(returnedBalance).toBe(expectedBalance)
    })

    //TODO: check when deposit is negative

    test('Deposit adds a transaction to the transaction list.', async () => {
      //Given
      const depositMoney = 1000
      const startingBalance = 100
      const expectedDate = '14/01/2012 14:30:45.450346'
      const horloge = new HorlogeTest([expectedDate])
      const account = new bankAccount(startingBalance, horloge)
      const expectedBalance = depositMoney + startingBalance
      await new Promise(r => setTimeout(r, 1))
      //When
      const returnedBalance = account.deposit(depositMoney)
      //Then
      expect(returnedBalance).toBe(expectedBalance)
      const transaction = account.transactions[0]
      expect(transaction).toEqual({
        date: expectedDate,
        value: depositMoney,
        newBalance: expectedBalance,
      })
    })

    test('Does 2 back to back deposits that should have a different date.', async () => {
      //Given
      const depositMoney = 100
      const startingBalance = 0
      const expectedFirstDate = '14/01/2012 14:30:45.450346'
      const expectedSecondDate = '15/01/2012 14:30:45.450346'
      const horloge = new HorlogeTest([expectedFirstDate, expectedSecondDate])
      const account = new bankAccount(startingBalance, horloge)
      await new Promise(r => setTimeout(r, 1))
      //When
      account.deposit(depositMoney)
      account.deposit(depositMoney)
      //Then
      const firstTransaction = account.transactions[0]
      const secondTransaction = account.transactions[1]
      expect(firstTransaction).toEqual({
        date: expectedFirstDate,
        value: depositMoney,
        newBalance: depositMoney,
      })
      expect(secondTransaction).toEqual({
        date: expectedSecondDate,
        value: depositMoney,
        newBalance: 2 * depositMoney,
      })
    })

    test("Deposit can't be negative", () => {
      //Given
      const depositMoney = -100
      const startingBalance = 100
      const account = new bankAccount(startingBalance)
      //When
      const returnedBalance = account.deposit(depositMoney)
      //Then
      expect(returnedBalance).toEqual(new negativeDepositError())
    })
  })

  describe('withdraw', () => {
    test('Withdraw adds a transaction to the transaction list.', () => {
      //Given
      const amountToWithdraw = 100
      const startingBalance = 1000
      const expectedDate = '14/01/2012 14:30:45.450346'
      const horloge = new HorlogeTest([expectedDate])
      const account = new bankAccount(startingBalance, horloge)
      const expectedBalance = startingBalance - amountToWithdraw
      //When
      const returnedBalance = account.withdraw(amountToWithdraw)
      //Then
      expect(returnedBalance).toBe(expectedBalance)
      const transaction = account.transactions[0]
      expect(transaction).toEqual({
        date: expectedDate,
        value: -amountToWithdraw,
        newBalance: expectedBalance,
      })
    })
    test('Overdraft of more than -100 is not authorized', () => {
      //Given
      const startingBalance = 0
      const amountToWithdraw = 101
      const account = new bankAccount(startingBalance)
      //When
      const returnedBalance = account.withdraw(amountToWithdraw)
      //Then
      expect(returnedBalance).toEqual(new overdraftReachedError())
    })
  })

  describe('ChoicePicker', () => {
    describe('greet', () => {
      test('Return a greeting message', () => {
        //Given
        const picker = new ChoicePicker()
        //When
        const greetMessage = picker.greet()
        //Then
        expect(greetMessage).toBe('Welcome to InterBank.')
      })
    })
  })
})
