import bankAccount from '../src/BankAccount'

describe('bankAccount', () => {
  describe('consult', () => {
    test('Consult bank account created whith no money. Expect 0', () => {
      //Given
      var account = new bankAccount()
      //When
      var currentMoney = account.checkBalance()
      //Then
      expect(currentMoney).toBe(0)
    })

    test('Consult bank account created with 1000. Expect 1000', () => {
      //Given
      var inputMoney = 1000
      var account = new bankAccount(inputMoney)
      //When
      var currentMoney = account.checkBalance()
      //Then
      expect(currentMoney).toBe(inputMoney)
    })
  })

  describe('deposit', () => {
    test('Deposit of 1000 to a bank account with no money. Expect 1000', () => {
      //Given
      var depositMoney = 1000
      var account = new bankAccount()
      //When
      var returnedBalance = account.deposit(depositMoney)
      //Then
      expect(returnedBalance).toBe(depositMoney)
    })

    test('Deposit of 1000 to a bank account with 100 money. Expect 1100', () => {
      //Given
      var depositMoney = 1000
      var inputMoney = 100
      var account = new bankAccount(inputMoney)
      var expectedBalance = depositMoney + inputMoney
      //When
      var returnedBalance = account.deposit(depositMoney)
      //Then
      expect(returnedBalance).toBe(expectedBalance)
    })

    test('Deposits add a transaction to the transaction list.', () => {
      //Given
      var depositMoney = 1000
      var inputMoney = 100
      var account = new bankAccount(inputMoney)
      var expectedBalance = depositMoney + inputMoney
      var expectedDate = new Date().toLocaleDateString()
      //When
      account.deposit(depositMoney)
      //Then
      var transaction = account.transactions[0]
      expect(transaction.date).toBe(expectedDate)
      expect(transaction.value).toBe(depositMoney)
      expect(transaction.newBalance).toBe(expectedBalance)
    })
  })

  describe('withdrawal', () => {
    test('Withdrawal of 100 to a bank account with 100 money. Expect 0', () => {
      //Given
      var inputMoney = 100
      var withdrawalMoney = 100
      var account = new bankAccount(inputMoney)
      var expectedBalance = inputMoney - withdrawalMoney
      //When
      var returnedBalance = account.withdraw(withdrawalMoney)
      //Then
      expect(returnedBalance).toBe(expectedBalance)
    })
    test('Overdraft of more than -100 is not authorized', () => {
      //Given
      var errorMessage = "Can't have an overdraft over -100"
      var inputMoney = 0
      var withdrawalMoney = 101
      var account = new bankAccount(inputMoney)
      //When
      var returnedBalance = account.withdraw(withdrawalMoney)
      //Then
      expect(returnedBalance).toBe(errorMessage)
    })
  })
})
