import EmployeesRegistry from './EmployeesRegistry';
import { IEmployee } from './interfaces';

describe('EmployeesRegistry', () => {
  let employeesRegistry: EmployeesRegistry;

  beforeEach(() => {
    employeesRegistry = new EmployeesRegistry();
  });

  it('Should add an employee to the zoo employees registry', () => {
    const zooKeeper: IEmployee = {
      name: 'John Doe',
      position: 'Zoo Keeper',
      salary: 3000,
      responsibilities: ['Feeding animals', 'Cleaning enclosures'],
    };
    employeesRegistry.addItem(zooKeeper);
    expect(employeesRegistry.getItems()).toContain(zooKeeper);
  });

  it('Should return the list of employees in the zoo employees registry', () => {
    const employees: IEmployee[] = [
      {
        name: 'John Doe',
        position: 'Zoo Keeper',
        salary: 3000,
        responsibilities: ['Feeding animals', 'Cleaning enclosures'],
      },
      {
        name: 'Jane Smith',
        position: 'Veterinarian',
        salary: 4000,
        responsibilities: ['Medical care for animals', 'Health checkups'],
      },
    ];

    employees.forEach(employee => employeesRegistry.addItem(employee));

    const retrievedEmployees = employeesRegistry.getItems();

    expect(retrievedEmployees).toEqual(employees);
  });
});
