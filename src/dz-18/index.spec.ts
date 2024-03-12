import { zoo, cashier, marketingDepartment } from './index';
import Zoo from './Zoo';
import Cashier from './Cashier';
import MarketingDepartment from './MarketingDepartment';
import Budget from './Budget';

describe('index.ts', () => {
  it('should create an instance of Zoo', () => {
    expect(zoo).toBeInstanceOf(Zoo);
  });

  it('should create an instance of Cashier', () => {
    expect(cashier).toBeInstanceOf(Cashier);
  });

  it('should create an instance of MarketingDepartment', () => {
    expect(marketingDepartment).toBeInstanceOf(MarketingDepartment);
  });

  it('should initialize Zoo with correct initial budget', () => {
    const initialBudget = 80000;
    const zoo = new Zoo(initialBudget);
    const budget = zoo.getBudget();
    expect(budget).toBeInstanceOf(Budget);
    expect(budget.getBalance()).toBe(initialBudget);
  });

  it('should sell tickets successfully and add visitors to the cashier', () => {
    const cashier = new Cashier(new Date());
    const visitor1: IVisitor = { name: 'Visitor 1', contactInfo: 'visitor1@example.com' };
    const visitor2: IVisitor = { name: 'Visitor 2', contactInfo: 'visitor2@example.com' };

    const ticketPrice1 = cashier.sellTicket('adult', visitor1);
    const ticketPrice2 = cashier.sellTicket('child', visitor2);

    expect(ticketPrice1).toBeGreaterThan(0);
    expect(ticketPrice2).toBeGreaterThan(0);

    const currentVisitors = cashier.getVisitors();
    expect(currentVisitors.length).toBe(2);
    expect(currentVisitors).toContainEqual(visitor1);
    expect(currentVisitors).toContainEqual(visitor2);
  });
});
