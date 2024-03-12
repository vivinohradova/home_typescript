import { IEmployee, IAnimal, IAdministration } from './interfaces';

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

export default Administration;
