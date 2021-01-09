## How to transfer money from one account to another?

It needs to lock accounts in the same order (by id ascending order for example) to avoid deadlock.

<details>
  <summary>Show some code</summary>
  
  ```java
  public void transfer(Account accountFrom, Account accountTo, Long amount) {
      int fromId = accountFrom.getId();
      int toId = accountTo.getId();
      if (fromId < toId) {
          synchronized (accountFrom) {
              synchronized (accountTo) {
                  doTransfer(accountFrom, accountTo, amount);
              }
          }
      } else  {
          synchronized (accountTo) {
              synchronized (accountFrom) {
                  doTransfer(accountFrom, accountTo, amount);
              }
          }
      }
  }
  
  private void doTransfer(Account accountFrom, Account accountTo, Long amount) {
      if (accountFrom.getBalance().compareTo(amount) < 0) {
          throw new InsufficientFundsException();
      } else {
          accountFrom.debit(amount);
          accountTo.credit(amount);
      }
  }
  ```
</details>

--------------------

## Multiply two numbers given as strings

**Input:** 
- String number1 = "239391391289323784827473442342";
- String number2 = "456867002134576956057346453345".

