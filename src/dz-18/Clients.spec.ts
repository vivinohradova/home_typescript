import Clients from './Clients';
import { IVisitor } from './interfaces';

describe('Clients', () => {
  let clients: Clients;

  beforeEach(() => {
    clients = new Clients();
  });

  describe('addClient', () => {
    it('should add a client to the client list', () => {
      const client: IVisitor = { name: 'John Doe', contactInfo: 'john@example.com' };
      clients.addClient(client);
      expect(clients.getClientList()).toContain(client);
    });
  });

  describe('getClientList', () => {
    it('should return the list of clients', () => {
      const client1: IVisitor = { name: 'John Doe', contactInfo: 'john@example.com' };
      const client2: IVisitor = { name: 'Jane Smith', contactInfo: 'jane@example.com' };

      clients.addClient(client1);
      clients.addClient(client2);

      const clientList = clients.getClientList();

      expect(clientList).toContain(client1);
      expect(clientList).toContain(client2);
      expect(clientList.length).toBe(2);
    });
  });
});
