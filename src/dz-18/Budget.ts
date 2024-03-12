import { IBudget } from './interfaces';

class Budget implements IBudget {
    private balance: number;
    private expenses: number;
    private revenue: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.expenses = 0;
        this.revenue = 0;
    }

    getBalance(): number {
        return this.balance;
    }

    addExpense(amount: number): void {
        this.expenses += amount;
        this.balance -= amount;
    }

    subtractExpense(amount: number): void {
        this.expenses -= amount;
        this.balance += amount;
    }

    addRevenue(amount: number): void {
        this.revenue += amount;
        this.balance += amount;
    }

    getExpenses(): number {
        return this.expenses;
    }

    getRevenue(): number {
        return this.revenue;
    }
}

export default Budget;
