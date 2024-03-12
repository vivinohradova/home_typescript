export interface IVisitor {
    name: string;
    contactInfo: string;
}

export interface IClients {
    addClient(client: IVisitor): void;
    getClientList(): IVisitor[];
}

export interface ICashier {
    sellTicket(ticketType: string, visitor: IVisitor): number;
    getVisitors(): IVisitor[];
    getClients(): IVisitor[];
    getDailyRevenue(): number;
}

export interface IMarketingDepartment {
    addClient(client: IVisitor): void;
    getClientList(): IVisitor[];
    sendAdvertisements(message: string): void;
}

export interface IRevenue {
    addRevenue(amount: number): void;
    getDailyRevenue(): number;
}

export interface IAccounting {
    addFinancialRecord(record: string): void;
    getFinancialRecords(): string[];
    setRevenue(revenue: IRevenue): void;
    getTotalRevenue(): number;
    setBudget(budget: IBudget): void;
    getBudget(): IBudget;
    payExpenses(amount: number): void;
    addEmployee(employee: IEmployee): void;
    getEmployees(): IEmployee[];
    addAnimal(animal: IAnimal): void;
    getAnimals(): IAnimal[];
    generateFinancialReport(): string;
}

export interface IAnimal {
    species: string;
    name: string;
    age: string;
    health: string;
}

export interface IEmployee {
    name: string;
    position: string;
    salary: number;
    responsibilities: string[];
}

export interface IBudget {
    getBalance(): number;
    addExpense(amount: number): void;
    subtractExpense(amount: number): void;
    addRevenue(amount: number): void;
    getExpenses(): number;
    getRevenue(): number;
}

export interface IAdministration {
    addEmployee(employee: IEmployee): void;
    removeEmployee(index: number): void;
    addAnimal(animal: IAnimal): void;
    removeAnimal(index: number): void;
    getEmployees(): IEmployee[];
    getAnimals(): IAnimal[];
    createAdvertisementNotification(message: string): void;
    createImportantEventNotification(event: string): void;
}