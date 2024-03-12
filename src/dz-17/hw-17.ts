
interface IVisitor {
    name: string;
    contactInfo: string;
}

class CurrentVisitors {
    private visitors: IVisitor[];
    private closingTime: Date;

    constructor(closingTime: Date) {
        this.visitors = [];
        this.closingTime = closingTime;
    }

    addVisitor(visitor: IVisitor): void {
        this.visitors.push(visitor);
    }

    getVisitors(): IVisitor[] {
        return this.visitors;
    }

    sendClosingNotification(): void {
        const currentTime = new Date();
        const timeDiff = this.closingTime.getTime() - currentTime.getTime();
        const minutesRemaining = Math.floor(timeDiff / (1000 * 60));
        if (minutesRemaining <= 15 && minutesRemaining > 0) {
            console.log(`Увага! Залишилося ${minutesRemaining} хвилин до закриття. Будь ласка, завершіть ваше відвідування.`);
        }
    }

    notifyOnDeparture(): void {
        console.log("Оповіщення відвідувачів перед відходом:");
        this.visitors.forEach(visitor => {
            console.log(`Оповіщено відвідувача ${visitor.name} (${visitor.contactInfo})`);
        });
    }
}

interface IClients {
    addClient(client: IVisitor): void;
    getClientList(): IVisitor[];
}

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

interface ICashier {
    sellTicket(ticketType: string, visitor: IVisitor): number;
    getVisitors(): IVisitor[];
    getClients(): IVisitor[];
    getDailyRevenue(): number;
}

class Cashier implements ICashier {
    private ticketPrices: { [key: string]: number };
    private currentVisitors: CurrentVisitors;
    private clients: Clients;
    private revenue: Revenue;

    constructor(closingTime: Date) {
        this.ticketPrices = {
            adult: 100,
            child: 50,
            family: 200
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
            console.log("Недопустимий тип квитка.");
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

interface IMarketingDepartment {
    addClient(client: IVisitor): void;
    getClientList(): IVisitor[];
    sendAdvertisements(message: string): void;
}

class MarketingDepartment {
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

interface IRevenue {
    addRevenue(amount: number): void;
    getDailyRevenue(): number;
}

class Revenue implements IRevenue {
    private dailyRevenue: number;

    constructor() {
        this.dailyRevenue = 0;
    }

    addRevenue(amount: number): void {
        this.dailyRevenue += amount;
    }

    getDailyRevenue(): number {
        return this.dailyRevenue;
    }
}

interface IAccounting {
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

class Accounting implements IAccounting {
    private financialRecords: string[];
    private revenue?: Revenue;
    private budget: Budget;
    private employeesRegistry: EmployeesRegistry;
    private animalsRegistry: AnimalsRegistry;

    constructor(initialBudget: number) {
        this.financialRecords = [];
        this.budget = new Budget(initialBudget);
        this.employeesRegistry = new EmployeesRegistry();
        this.animalsRegistry = new AnimalsRegistry();
    }

    addFinancialRecord(record: string): void {
        this.financialRecords.push(record);
    }

    getFinancialRecords(): string[] {
        return this.financialRecords;
    }

    setRevenue(revenue: Revenue): void {
        this.revenue = revenue;
    }

    getTotalRevenue(): number {
        if (this.revenue) {
            return this.revenue.getDailyRevenue();
        } else {
            console.log("Дані про виручку не встановлені.");
            return 0;
        }
    }

    setBudget(budget: Budget): void {
        if (budget !== null && budget !== undefined) {
            this.budget = budget;
        } else {
            throw new Error('Бюджет не може бути рівним null або undefined.');
        }
    }

    getBudget(): Budget {
        return this.budget;
    }

    payExpenses(amount: number): void {
        this.budget.subtractExpense(amount);
        this.addFinancialRecord(`Оплачено витрати: ${amount}`);
    }

    addEmployee(employee: IEmployee): void {
        this.employeesRegistry.addItem(employee);
    }

    getEmployees(): IEmployee[] {
        return this.employeesRegistry.getItems();
    }

    addAnimal(animal: IAnimal): void {
        this.animalsRegistry.addItem(animal);
    }

    getAnimals(): IAnimal[] {
        return this.animalsRegistry.getItems();
    }

    generateFinancialReport(): string {
        return "Фінансовий звіт";
    }
}

interface IAnimal {
    species: string;
    name: string;
    age: string;
    health: string;
}

interface IEmployee {
    name: string;
    position: string;
    salary: number;
    responsibilities: string[];
}

abstract class Registry<T> {
    protected items: T[];

    constructor() {
        this.items = [];
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    getItems(): T[] {
        return this.items;
    }
}

class EmployeesRegistry extends Registry<IEmployee> {
    constructor() {
        super();
    }
}

class AnimalsRegistry extends Registry<IAnimal> {
    constructor() {
        super();
    }
}

interface IAdministration {
    addEmployee(employee: IEmployee): void;
    removeEmployee(index: number): void;
    addAnimal(animal: IAnimal): void;
    removeAnimal(index: number): void;
    getEmployees(): IEmployee[];
    getAnimals(): IAnimal[];
    createAdvertisementNotification(message: string): void;
    createImportantEventNotification(event: string): void;
}

class Administration implements IAdministration {
    private employees: IEmployee[];
    private animals: IAnimal[];

    constructor() {
        this.employees = [];
        this.animals = [];
    }

    addEmployee(employee: IEmployee): void {
        this.employees.push(employee);
    }

    removeEmployee(index: number): void {
        if (index >= 0 && index < this.employees.length) {
            this.employees.splice(index, 1);
        }
    }

    addAnimal(animal: IAnimal): void {
        this.animals.push(animal);
    }

    removeAnimal(index: number): void {
        if (index >= 0 && index < this.animals.length) {
            this.animals.splice(index, 1);
        }
    }

    getEmployees(): IEmployee[] {
        return this.employees;
    }

    getAnimals(): IAnimal[] {
        return this.animals;
    }

    createAdvertisementNotification(message: string): void {
        console.log(`Створено сповіщення про рекламну акцію: "${message}"`);
    }

    createImportantEventNotification(event: string): void {
        console.log(`Створено сповіщення про важливу подію: "${event}"`);
    }
}

interface IBudget {
    getBalance(): number;
    addExpense(amount: number): void;
    subtractExpense(amount: number): void;
    addRevenue(amount: number): void;
    getExpenses(): number;
    getRevenue(): number;
}

class Budget implements IBudget {
    private balance: number;
    private expenses: number;
    private revenue: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.expenses = 0;
        this.revenue = 0;
    }

    getBalance(): number {
        return this.balance;
    }

    addExpense(amount: number): void {
        this.expenses += amount;
        this.balance -= amount;
    }

    subtractExpense(amount: number): void {
        this.expenses -= amount;
        this.balance += amount;
    }

    addRevenue(amount: number): void {
        this.revenue += amount;
        this.balance += amount;
    }

    getExpenses(): number {
        return this.expenses;
    }

    getRevenue(): number {
        return this.revenue;
    }
}

class Zoo {
    private administration: Administration;
    private budget: Budget;

    constructor(initialBudget: number) {
        this.administration = new Administration();
        this.budget = new Budget(initialBudget);
    }

    getAdministration(): Administration {
        return this.administration;
    }

    getBudget(): Budget {
        return this.budget;
    }
}



const zoo = new Zoo(80000);

const budget = zoo.getBudget();
console.log("Поточний бюджет зоопарку:", budget.getBalance());

const closingTime = new Date();
closingTime.setHours(18, 0, 0);
const cashier = new Cashier(closingTime);
console.log("Час закриття зоопарку:", closingTime.toLocaleTimeString());


const marketingDepartment = new MarketingDepartment();


const lion: IAnimal = { species: "Лев", name: "Сімба", age: "3", health: "Відмінно" };
const elephant: IAnimal = { species: "Слон", name: "Дамбо", age: "10", health: "Добре" };
zoo.getAdministration().addAnimal(lion);
zoo.getAdministration().addAnimal(elephant);
console.log("Тварини у зоопарку:");
console.log("1. Лев: ", lion);
console.log("2. Слон: ", elephant);


const zookeeper: IEmployee = { name: "Олексій Іванов", position: "Доглядач зоопарку", salary: 3000, responsibilities: ["Годування тварин", "Прибирання вольєрів"] };
const veterinarian: IEmployee = { name: "Анна Сміт", position: "Ветеринар", salary: 4000, responsibilities: ["Медичний догляд за тваринами"] };
zoo.getAdministration().addEmployee(zookeeper);
zoo.getAdministration().addEmployee(veterinarian);
console.log("Працівники зоопарку:");
console.log("1. Доглядач зоопарку: ", zookeeper);
console.log("2. Ветеринар: ", veterinarian);


const visitor1: IVisitor = { name: "Аліса", contactInfo: "alice@example.com" };
const visitor2: IVisitor = { name: "Ігор", contactInfo: "igor@example.com" };
const ticketPrice1 = cashier.sellTicket("adult", visitor1);
const ticketPrice2 = cashier.sellTicket("child", visitor2);


const dailyRevenue = cashier.getDailyRevenue();
zoo.getBudget().addRevenue(ticketPrice1 + ticketPrice2);

console.log(`Продано квиток для ${visitor1.name} по ціні ${ticketPrice1} $`);
console.log(`Продано квиток для ${visitor2.name} по ціні ${ticketPrice2} $`);
console.log(`Щоденний прибуток: ${dailyRevenue} $`);


const currentVisitors = cashier.getVisitors();
console.log("Поточні відвідувачі:");
currentVisitors.forEach(visitor => {
    console.log(`${visitor.name} (${visitor.contactInfo})`);
});


marketingDepartment.addClient(visitor1);
marketingDepartment.addClient(visitor2);
marketingDepartment.sendAdvertisements("Спеціальна подія в зоопарку цієї суботи!");


const currentVisitorsInstance = cashier["currentVisitors"];

if (currentVisitorsInstance) {
    currentVisitorsInstance.sendClosingNotification();
} else {
    console.log("Нема поточних відвідувачів.");
}


const updatedBudget = zoo.getBudget();
console.log("Оновлений бюджет зоопарку:", updatedBudget.getBalance());
const financialReport = `Фінансовий звіт: Баланс: ${updatedBudget.getBalance()}, Доходи: ${updatedBudget.getRevenue()}, Витрати: ${updatedBudget.getExpenses()}`;
console.log(financialReport);
