import Administration from './Administration';
import { IEmployee, IAnimal } from './interfaces';

describe('Administration', () => {
  let administration: Administration;

  beforeEach(() => {
    administration = new Administration();
  });

  describe('addEmployee', () => {
    it('should add an employee to the employees list', () => {
      const employee: IEmployee = {
        name: 'John Doe',
        position: 'Zookeeper',
        salary: 5000,
        responsibilities: ['Animal feeding'],
      };
      administration.addEmployee(employee);
      expect(administration.getEmployees()).toContain(employee);
    });
  });

  describe('removeEmployee', () => {
    it('should remove an employee from the employees list by index', () => {
      const employee1: IEmployee = {
        name: 'John Doe',
        position: 'Zookeeper',
        salary: 5000,
        responsibilities: ['Animal feeding'],
      };
      const employee2: IEmployee = {
        name: 'Jane Smith',
        position: 'Veterinarian',
        salary: 4000,
        responsibilities: ['Medical care of animals'],
      };
      administration.addEmployee(employee1);
      administration.addEmployee(employee2);
      administration.removeEmployee(0);
      expect(administration.getEmployees()).not.toContain(employee1);
    });

    it('should not remove an employee if the index is out of bounds', () => {
      const employee: IEmployee = {
        name: 'John Doe',
        position: 'Zookeeper',
        salary: 5000,
        responsibilities: ['Animal feeding'],
      };
      administration.addEmployee(employee);
      administration.removeEmployee(1);
      expect(administration.getEmployees()).toContain(employee);
    });
  });

  describe('addAnimal', () => {
    it('should add an animal to the animals list', () => {
      const animal: IAnimal = { species: 'Lion', name: 'Simba', age: '3', health: 'Excellent' };
      administration.addAnimal(animal);
      expect(administration.getAnimals()).toContain(animal);
    });
  });

  describe('removeAnimal', () => {
    it('should remove an animal from the animals list by index', () => {
      const animal1: IAnimal = { species: 'Lion', name: 'Simba', age: '3', health: 'Excellent' };
      const animal2: IAnimal = { species: 'Elephant', name: 'Dumbo', age: '10', health: 'Good' };
      administration.addAnimal(animal1);
      administration.addAnimal(animal2);
      administration.removeAnimal(0);
      expect(administration.getAnimals()).not.toContain(animal1);
    });

    it('should not remove an animal if the index is out of bounds', () => {
      const animal: IAnimal = { species: 'Lion', name: 'Simba', age: '3', health: 'Excellent' };
      administration.addAnimal(animal);
      administration.removeAnimal(1);
      expect(administration.getAnimals()).toContain(animal);
    });
  });

  describe('getEmployees', () => {
    it('should return an empty array if no employees have been added', () => {
      const employees = administration.getEmployees();
      expect(employees).toEqual([]);
    });

    it('should return the list of added employees', () => {
      const employee1: IEmployee = {
        name: 'John Doe',
        position: 'Zookeeper',
        salary: 5000,
        responsibilities: ['Animal feeding'],
      };
      const employee2: IEmployee = {
        name: 'Jane Smith',
        position: 'Veterinarian',
        salary: 4000,
        responsibilities: ['Medical care of animals'],
      };

      administration.addEmployee(employee1);
      administration.addEmployee(employee2);

      const employees = administration.getEmployees();
      expect(employees).toContain(employee1);
      expect(employees).toContain(employee2);
      expect(employees.length).toBe(2);
    });
  });

  describe('getAnimals', () => {
    it('should return an empty array if no animals have been added', () => {
      const animals = administration.getAnimals();
      expect(animals).toEqual([]);
    });

    it('should return the list of added animals', () => {
      const animal1: IAnimal = {
        species: 'Lion',
        name: 'Simba',
        age: '3',
        health: 'Excellent',
      };
      const animal2: IAnimal = {
        species: 'Elephant',
        name: 'Dumbo',
        age: '10',
        health: 'Good',
      };

      administration.addAnimal(animal1);
      administration.addAnimal(animal2);

      const animals = administration.getAnimals();
      expect(animals).toContain(animal1);
      expect(animals).toContain(animal2);
      expect(animals.length).toBe(2);
    });
  });

  describe('createAdvertisementNotification', () => {
    it('should log a message about creating an advertisement notification', () => {
      const spy = jest.spyOn(console, 'log');
      administration.createAdvertisementNotification('Special discount for all customers!');
      expect(spy).toHaveBeenCalledWith('Створено сповіщення про рекламну акцію: "Special discount for all customers!"');
      spy.mockRestore();
    });
  });

  describe('createImportantEventNotification', () => {
    it('should log a message about creating an important event notification', () => {
      const spy = jest.spyOn(console, 'log');
      administration.createImportantEventNotification('Annual company meeting on Friday!');
      expect(spy).toHaveBeenCalledWith('Створено сповіщення про важливу подію: "Annual company meeting on Friday!"');
      spy.mockRestore();
    });
  });
});
