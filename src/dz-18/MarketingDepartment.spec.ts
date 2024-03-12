import MarketingDepartment from './MarketingDepartment';
import { IVisitor } from './interfaces';

describe('MarketingDepartment', () => {
  let marketingDepartment: MarketingDepartment;

  beforeEach(() => {
    marketingDepartment = new MarketingDepartment();
  });

  it('Should add a client to the marketing department client list', () => {
    const client: IVisitor = { name: 'John Doe', contactInfo: 'john@example.com' };
    marketingDepartment.addClient(client);
    expect(marketingDepartment.getClientList()).toContain(client);
  });

  it('Should return an empty array if no clients have been added', () => {
    expect(marketingDepartment.getClientList()).toEqual([]);
  });

  it('Should return the list of clients added to the marketing department', () => {
    const clients: IVisitor[] = [
      { name: 'John Doe', contactInfo: 'john@example.com' },
      { name: 'Jane Smith', contactInfo: 'jane@example.com' },
    ];
    clients.forEach(client => marketingDepartment.addClient(client));

    expect(marketingDepartment.getClientList()).toEqual(clients);
  });

  it('Should send advertisements to all clients in the client list', () => {
    const clients: IVisitor[] = [
      { name: 'John Doe', contactInfo: 'john@example.com' },
      { name: 'Jane Smith', contactInfo: 'jane@example.com' },
    ];
    clients.forEach(client => marketingDepartment.addClient(client));

    const message = 'Special offer: 20% off on all zoo tickets this weekend!';
    const consoleLogMock = jest.spyOn(console, 'log');

    marketingDepartment.sendAdvertisements(message);

    clients.forEach(client => {
      expect(consoleLogMock).toHaveBeenCalledWith(
        `Надіслано рекламне повідомлення "${message}" на адресу: ${client.contactInfo}`
      );
    });

    expect(consoleLogMock).toHaveBeenCalledTimes(clients.length);
    consoleLogMock.mockRestore();
  });
});
