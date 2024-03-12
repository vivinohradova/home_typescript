import Budget from './Budget';

describe('Budget', () => {
  let budget: Budget;

  beforeEach(() => {
    budget = new Budget(100000);
  });

  it('should initialize with the correct balance', () => {
    expect(budget.getBalance()).toBe(100000);
  });

  it('should add an expense correctly', () => {
    budget.addExpense(50000);
    expect(budget.getBalance()).toBe(50000);
    expect(budget.getExpenses()).toBe(50000);
  });

  it('should subtract an expense correctly', () => {
    budget.addExpense(50000);
    budget.subtractExpense(30000);
    expect(budget.getBalance()).toBe(80000);
    expect(budget.getExpenses()).toBe(20000);
  });

  it('should add revenue correctly', () => {
    budget.addRevenue(20000);
    expect(budget.getBalance()).toBe(120000);
    expect(budget.getRevenue()).toBe(20000);
  });
});
