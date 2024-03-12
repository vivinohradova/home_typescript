import { IVisitor, ICashier } from './interfaces';
import CurrentVisitors from './CurrentVisitors';
import Clients from './Clients';
import Revenue from './Revenue';

class Cashier implements ICashier {
  private ticketPrices: { [key: string]: number };
  private currentVisitors: CurrentVisitors;
  private clients: Clients;
  private revenue: Revenue;

  constructor(closingTime: Date) {
    this.ticketPrices = {
      adult: 100,
      child: 50,
      family: 200,
    };
    this.currentVisitors = new CurrentVisitors(closingTime);
    this.clients = new Clients();
    this.revenue = new Revenue();
  }

  sellTicket(ticketType: string, visitor: IVisitor): number {
    const price = this.ticketPrices[ticketType];
    if (price !== undefined) {
      this.currentVisitors.addVisitor(visitor);
      this.clients.addClient(visitor);
      this.revenue.addRevenue(price);
      return price;
    } else {
      console.log('Недопустимий тип квитка.');
      return 0;
    }
  }

  getVisitors(): IVisitor[] {
    return this.currentVisitors.getVisitors();
  }

  getClients(): IVisitor[] {
    return this.clients.getClientList();
  }

  getDailyRevenue(): number {
    return this.revenue.getDailyRevenue();
  }
}

export default Cashier;
