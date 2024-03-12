import Accounting from './Accounting';
import Revenue from './Revenue';
import Budget from './Budget';

describe('Accounting', () => {
  let accounting: Accounting;

  beforeEach(() => {
    accounting = new Accounting(100000);
  });

  describe('addFinancialRecord', () => {
    it('should add a financial record', () => {
      accounting.addFinancialRecord('Expense: $50');
      expect(accounting.getFinancialRecords()).toContain('Expense: $50');
    });
  });

  describe('getFinancialRecords', () => {
    it('should return the financial records array', () => {
      accounting.addFinancialRecord('Expense: $50');
      accounting.addFinancialRecord('Revenue: $100');

      const financialRecords = accounting.getFinancialRecords();

      expect(financialRecords).toEqual(['Expense: $50', 'Revenue: $100']);
    });
  });

  describe('setRevenue', () => {
    it('should set the revenue', () => {
      const revenue = new Revenue();
      accounting.setRevenue(revenue);
      expect(accounting.getTotalRevenue()).toBe(0);
    });
  });

  describe('getTotalRevenue', () => {
    it('should return the total revenue if revenue is set', () => {
      const revenue = new Revenue();
      revenue.addRevenue(5000);
      accounting.setRevenue(revenue);
      expect(accounting.getTotalRevenue()).toBe(5000);
    });

    it('should return 0 and log a message if revenue is not set', () => {
      const spy = jest.spyOn(console, 'log');
      expect(accounting.getTotalRevenue()).toBe(0);
      expect(spy).toHaveBeenCalledWith('Дані про виручку не встановлені.');
      spy.mockRestore();
    });
  });

  describe('setBudget', () => {
    it('should set the budget', () => {
      const budget = new Budget(200000);
      accounting.setBudget(budget);
      expect(accounting.getBudget()).toBe(budget);
    });

    it('should throw an error if the budget is null or undefined', () => {
      expect(() => accounting.setBudget(new Budget(200000))).not.toThrow();
    });
  });

  describe('getBudget', () => {
    it('should return the budget object', () => {
      const initialBudget = 100000;
      const accounting = new Accounting(initialBudget);
      const budget = accounting.getBudget();

      expect(budget instanceof Budget).toBe(true);
      expect(budget.getBalance()).toBe(initialBudget);
    });
  });

  describe('payExpenses', () => {
    it('should add a financial record for expenses', () => {
      accounting.payExpenses(50000);
      expect(accounting.getFinancialRecords()).toContain('Оплачено витрати: 50000');
    });
  });

  describe('addEmployee', () => {
    it('should add an employee to the employees registry', () => {
      const employee = { name: 'John Doe', position: 'Zookeeper', salary: 5000, responsibilities: ['Animal feeding'] };
      accounting.addEmployee(employee);
      expect(accounting.getEmployees()).toContain(employee);
    });
  });

  describe('getEmployees', () => {
    it('should return the list of employees', () => {
      const employee1: IEmployee = {
        name: 'John Doe',
        position: 'Zookeeper',
        salary: 5000,
        responsibilities: ['Animal feeding'],
      };
      const employee2: IEmployee = {
        name: 'Jane Smith',
        position: 'Veterinarian',
        salary: 4000,
        responsibilities: ['Medical care of animals'],
      };

      accounting.addEmployee(employee1);
      accounting.addEmployee(employee2);

      const employees = accounting.getEmployees();

      expect(employees).toContain(employee1);
      expect(employees).toContain(employee2);
      expect(employees.length).toBe(2);
    });
  });

  describe('addAnimal', () => {
    it('should add an animal to the animals registry', () => {
      const lion: IAnimal = { species: 'Lion', name: 'Simba', age: '3', health: 'Excellent' };

      accounting.addAnimal(lion);

      const animals = accounting.getAnimals();

      expect(animals).toContain(lion);
      expect(animals.length).toBe(1);
    });
  });

  describe('getAnimals', () => {
    it('should return the list of animals', () => {
      const lion: IAnimal = { species: 'Lion', name: 'Simba', age: '3', health: 'Excellent' };
      const elephant: IAnimal = { species: 'Elephant', name: 'Dumbo', age: '10', health: 'Good' };

      accounting.addAnimal(lion);
      accounting.addAnimal(elephant);

      const animals = accounting.getAnimals();

      expect(animals).toContain(lion);
      expect(animals).toContain(elephant);
      expect(animals.length).toBe(2);
    });
  });

  describe('generateFinancialReport', () => {
    it('should return the financial report string', () => {
      const financialReport = accounting.generateFinancialReport();

      expect(financialReport).toBe('Фінансовий звіт');
    });
  });
});
