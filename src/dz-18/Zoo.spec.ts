import Zoo from './Zoo';
import Administration from './Administration';
import Budget from './Budget';

describe('Zoo', () => {
  let zoo: Zoo;

  beforeEach(() => {
    const initialBudget = 100000;
    zoo = new Zoo(initialBudget);
  });

  it('should create an instance of Zoo with Administration and Budget', () => {
    expect(zoo.getAdministration()).toBeInstanceOf(Administration);
    expect(zoo.getBudget()).toBeInstanceOf(Budget);
  });

  it('should return the same instance of Administration and Budget', () => {
    const administration1 = zoo.getAdministration();
    const administration2 = zoo.getAdministration();
    const budget1 = zoo.getBudget();
    const budget2 = zoo.getBudget();

    expect(administration1).toBe(administration2);
    expect(budget1).toBe(budget2);
  });
});
