import { IVisitor, IClients } from './interfaces';

class Clients implements IClients {
    private clientList: IVisitor[];

    constructor() {
        this.clientList = [];
    }

    addClient(client: IVisitor): void {
        this.clientList.push(client);
    }

    getClientList(): IVisitor[] {
        return this.clientList;
    }
}

export default Clients;