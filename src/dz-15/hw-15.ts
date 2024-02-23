interface IObserver {
  update(observable: IObservable): void;
}


interface IObservable {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}


interface BankClient {
  firstName: string;
  lastName: string;
}

enum CurrencyTypeEnum {
    USD = 'USD',
    EUR = 'EUR',
    UAH = 'UAH',
}

interface ICurrencyConversionStrategy {
    convert(amount: number, currency: CurrencyTypeEnum): number;
}

abstract class Observable implements IObservable {
  private readonly observers: IObserver[] = [];


  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);


    if (isExist)
      return console.log('Observable: Observer has been attached already.');


    this.observers.push(observer);
    console.log('Observable:: Attached an observer.');
  }


  public detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);


    if (observerIndex === -1)
      return console.log('Observable: Nonexistent observer.');


    this.observers.splice(observerIndex, 1);
    console.log('Observable: Detached an observer.');
  }


  public notify(): void {
    console.log('Observable: Notifying observer...');
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}


class BankAccount extends Observable {
  private readonly currency: string;
  private _number: number;
  private balance = 1000;
  private _holderName!: string;
  private _conversionStrategy!: ICurrencyConversionStrategy;


  constructor(
    client: BankClient,
    currency: string,
    conversionStrategy: ICurrencyConversionStrategy
  ) {
    super();
    this.currency = currency;
    this.holderName = client;
    this._number = 12345678;
    this._conversionStrategy = conversionStrategy;
  }

  public get number(): number {
    return this._number;
  }

  public get balanceInfo(): string {
    return `${this.currency}${this.balance}`;
  }


  public get holderName(): string {
    return this._holderName;
  }


  public set holderName({ firstName, lastName }: BankClient) {
    if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
    if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);


    this._holderName = `${lastName} ${firstName}`;
  }


  public set conversionStrategy(strategy: ICurrencyConversionStrategy) {
    this._conversionStrategy = strategy;
  }


  public deposit(amount: number): void {
    this.balance += amount;
  }


  public withdraw(amount: number): void {
    if (this.balance < amount)
      throw new Error(
        `Sorry ${this._holderName}, you don't have enough funds!`
      );


    this.balance -= amount;
  }


  public makeTransaction(
    amount: number,
    targetCurrency: CurrencyTypeEnum
  ): void {
    const convertAmount = this._conversionStrategy.convert(
      amount,
      targetCurrency
    );
    this.balance -= convertAmount;


    console.log(
      `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertAmount} ${targetCurrency}, Balance: ${this.balance} ${this.currency}`
    );
    this.notify();
  }
}


class SMSNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `SMS notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}


class EmailNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Email notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}


class PushNotification implements IObserver {
  update(account: BankAccount): void {
    console.log(
      `Push notification: Your account balance has changed. Current balance ${account.balanceInfo}`
    );
  }
}


//====

class Bank {
    private static instance: Bank;
    private accounts: Map<BankClient, BankAccount[]> = new Map();

    private constructor() {}

    public static getInstance(): Bank {
        if (!Bank.instance) {
          Bank.instance = new Bank();
        }
        return Bank.instance;
      }
  
    public createAccount(client: BankClient, currency: string, conversionStrategy: ICurrencyConversionStrategy): void {
      const newAccount = new BankAccount(client, currency, conversionStrategy);
      if (this.accounts.has(client)) {
        const clientAccounts = this.accounts.get(client);
        if (clientAccounts) {
            clientAccounts.push(newAccount);
          }
        } else {
        this.accounts.set(client, [newAccount]);
      }
      console.log(`Bank: Created a new account for ${client.firstName} ${client.lastName} with currency ${currency}`);
    }
  
    public closeAccount(client: BankClient, accountNumber: number): void {
      if (!this.accounts.has(client)) {
        console.log(`Bank: Client ${client.firstName} ${client.lastName} does not have any accounts.`);
        return;
      }
  
      const clientAccounts = this.accounts.get(client);
      if (!clientAccounts) return;
  
      const index = clientAccounts.findIndex(account => account.number === accountNumber);
      if (index === -1) {
        console.log(`Bank: Account number ${accountNumber} does not exist for ${client.firstName} ${client.lastName}.`);
        return;
      }
  
      clientAccounts.splice(index, 1);
      console.log(`Bank: Closed account number ${accountNumber} for ${client.firstName} ${client.lastName}.`);
    }
  }



const bank = Bank.getInstance();

const client: BankClient = {
    firstName: "Vikky",
    lastName: "Vino"
};

// Створюємо рахунок у доларах
const usdConversionStrategy: ICurrencyConversionStrategy = {
    convert(amount: number): number {
        return amount;
    }
};
bank.createAccount(client, CurrencyTypeEnum.USD, usdConversionStrategy);

// Створюємо рахунок у євро
const eurConversionStrategy: ICurrencyConversionStrategy = {
    convert(amount: number): number {
        return amount * 1.2;
    }
};
bank.createAccount(client, CurrencyTypeEnum.EUR, eurConversionStrategy);

// Створюємо рахунок у гривнях
const uahConversionStrategy: ICurrencyConversionStrategy = {
    convert(amount: number): number {
        return amount * 0.04;
    }
};
bank.createAccount(client, CurrencyTypeEnum.UAH, uahConversionStrategy);

// Закриваємо рахунок у гривнях
const accountNumberToClose = 12345678;
bank.closeAccount(client, accountNumberToClose);

