import { IRevenue, IAccounting, IBudget, IEmployee, IAnimal } from './interfaces';
import Revenue from './Revenue';
import Budget from './Budget';
import EmployeesRegistry from './EmployeesRegistry';
import AnimalsRegistry from './AnimalsRegistry';

class Accounting implements IAccounting {
  private financialRecords: string[];
  private revenue?: Revenue;
  private budget: Budget;
  private employeesRegistry: EmployeesRegistry;
  private animalsRegistry: AnimalsRegistry;

  constructor(initialBudget: number) {
    this.financialRecords = [];
    this.budget = new Budget(initialBudget);
    this.employeesRegistry = new EmployeesRegistry();
    this.animalsRegistry = new AnimalsRegistry();
  }

  addFinancialRecord(record: string): void {
    this.financialRecords.push(record);
  }

  getFinancialRecords(): string[] {
    return this.financialRecords;
  }

  setRevenue(revenue: Revenue): void {
    this.revenue = revenue;
  }

  getTotalRevenue(): number {
    if (this.revenue) {
      return this.revenue.getDailyRevenue();
    } else {
      console.log('Дані про виручку не встановлені.');
      return 0;
    }
  }

  setBudget(budget: Budget): void {
    if (budget !== null && budget !== undefined) {
      this.budget = budget;
    } else {
      throw new Error('Бюджет не може бути рівним null або undefined.');
    }
  }

  getBudget(): Budget {
    return this.budget;
  }

  payExpenses(amount: number): void {
    const currentBalance = this.budget.getBalance();
    this.budget.subtractExpense(amount);
    this.addFinancialRecord(`Оплачено витрати: ${amount}`);
  }

  addEmployee(employee: IEmployee): void {
    this.employeesRegistry.addItem(employee);
  }

  getEmployees(): IEmployee[] {
    return this.employeesRegistry.getItems();
  }

  addAnimal(animal: IAnimal): void {
    this.animalsRegistry.addItem(animal);
  }

  getAnimals(): IAnimal[] {
    return this.animalsRegistry.getItems();
  }

  generateFinancialReport(): string {
    return 'Фінансовий звіт';
  }
}

export default Accounting;
