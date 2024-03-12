import Cashier from './Cashier';

describe('Cashier', () => {
  let cashier: Cashier;

  beforeEach(() => {
    cashier = new Cashier(new Date());
  });

  it('should sell ticket and add visitor and client', () => {
    const visitor = { name: 'John Doe', age: 30, contactInfo: 'email@example.com' };

    cashier.sellTicket('adult', visitor);

    const visitors = cashier.getVisitors();
    const clients = cashier.getClients();

    expect(visitors).toContain(visitor);
    expect(clients).toContain(visitor);
  });

  it('should handle invalid ticket type', () => {
    const visitor = { name: 'John Doe', age: 30, contactInfo: 'email@example.com' };
    const invalidTicketType = 'student';

    const revenueBefore = cashier.getDailyRevenue();
    const result = cashier.sellTicket(invalidTicketType, visitor);

    expect(result).toBe(0);

    expect(cashier.getDailyRevenue()).toBe(revenueBefore);
  });
});
