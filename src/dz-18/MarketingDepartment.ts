import { IVisitor, IMarketingDepartment } from './interfaces';
import Clients from './Clients';

class MarketingDepartment implements IMarketingDepartment {
    private clientList: Clients;

    constructor() {
        this.clientList = new Clients();
    }

    addClient(client: IVisitor): void {
        this.clientList.addClient(client);
    }

    getClientList(): IVisitor[] {
        return this.clientList.getClientList();
    }

    sendAdvertisements(message: string): void {
        const clients = this.clientList.getClientList();
        for (const client of clients) {
            console.log(`Надіслано рекламне повідомлення "${message}" на адресу: ${client.contactInfo}`);
        }
    }
}

export default MarketingDepartment;
