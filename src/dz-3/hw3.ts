type Company = {
    name: string;
    departments: Department[];
    preHiredEmployees: PreHiredEmployee[];
    employees: Employee[];
}

type Department = {
    name: string;
    domain: string;
    employees: Employee[];
    preHiredEmployees: PreHiredEmployee[];
    budget: { debit: number, credit: number };

    addEmployee(employee: Employee): void;
    transformEmployee(preHiredEmployee: PreHiredEmployee): Employee;
    removeEmployee(employee: Employee): void;
}

type PreHiredEmployee = {
    firstName: string;
    surName: string;
    salary: number;
    bankAccountNumber: string;
}

type Employee = {
    firstName: string;
    surName: string;
    paymentInformation: PaymentInformation;
    salary: number;
    status: EmployeeStatus;
    department: Department;
}

enum EmployeeStatus {
    Active = "Активний",
    NoActive = "Неактивний",
    Vacation = "У неоплачуваній відпусці"
}

type PaymentInformation = {
    name: string;
    bankAccountNumber: string;
}

type Accounting = Department & {
    balance: number;

    addToBalance(qty: EmployeeClass | DepartmentClass): void;
    removeFromBalance(qty: number): void;
    payrollPayments(): void;
}


class EmployeeClass implements Employee {
    constructor(
        public firstName: string,
        public surName: string,
        public paymentInformation: PaymentInformation,
        public salary: number,
        public status: EmployeeStatus,
        public department: Department
    ) { }
}

class PreHiredEmployeeClass implements PreHiredEmployee {
    constructor(
        public firstName: string,
        public surName: string,
        public salary: number,
        public bankAccountNumber: string,
    ) { }
}

enum PaymentType {
    Internal = "внутрішню оплату",
    External = "зовнішню оплату"
}

function getPaid(employee: Employee | PreHiredEmployee): void {
    if (employee instanceof EmployeeClass) {
        if (employee.status === EmployeeStatus.Active) {
            console.log(`Працівник активний. Отримує ${PaymentType.Internal} `)
        } else {
            console.log("Працівник не активний");
        }
    } else if (employee instanceof PreHiredEmployeeClass) {
        console.log(`Попередньо найнятий співробітник. Отримує ${PaymentType.External}`)
    }
}

class DepartmentClass implements Department {
    constructor(
        public name: string,
        public domain: string,
        public employees: Employee[],
        public budget: { debit: number, credit: number },
        public preHiredEmployees: PreHiredEmployee[] = []
    ) { }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
        this.budget.debit += employee.salary;
    }

    transformEmployee(preHiredEmployee: PreHiredEmployee): Employee {
        const employee: Employee = {
            firstName: preHiredEmployee.firstName,
            surName: preHiredEmployee.surName,
            paymentInformation: {
                name: preHiredEmployee.firstName,
                bankAccountNumber: preHiredEmployee.bankAccountNumber
            },
            salary: preHiredEmployee.salary,
            status: EmployeeStatus.Active,
            department: this
        }

        this.addEmployee(employee);
        this.removePreHiredEmployee(preHiredEmployee);

        console.log(`Попередньо найнятий співробітник ${preHiredEmployee.firstName} ${preHiredEmployee.surName} перетворений на співробітника.`);

        return employee;

    }
    removeEmployee(employee: EmployeeClass): void {
        this.employees = this.employees.filter((emp: EmployeeClass) => emp.firstName !== employee.firstName || emp.surName !== employee.surName);
        this.budget.debit -= employee.salary;
        console.log(`Співробітник ${employee.firstName} ${employee.surName} видалений.`);
    }

    removePreHiredEmployee(preHiredEmployee: PreHiredEmployeeClass): void {
        this.preHiredEmployees = this.preHiredEmployees.filter((pre: PreHiredEmployeeClass) => pre.firstName !== preHiredEmployee.firstName || pre.surName !== preHiredEmployee.surName);
        console.log(`Попередньо найнятий співробітник ${preHiredEmployee.firstName} ${preHiredEmployee.surName} видалений.`);
    }
}

class AccountingClass extends DepartmentClass implements Accounting {
    balance: number;

    constructor(
        name: string,
        domain: string,
        employees: Employee[],
        budget: { debit: number; credit: number },
        preHiredEmployees: PreHiredEmployee[]
    ) {
        super(name, domain, employees, budget, preHiredEmployees);
        this.balance = 0;
    }

    addToBalance(qty: EmployeeClass | DepartmentClass): void {
        if (qty instanceof EmployeeClass) {
            this.balance += qty.salary;
        } else if (qty instanceof DepartmentClass) {
            this.balance += qty.budget.debit;
        }
        console.log(`Взято на баланс: ${qty}. Поточний баланс: ${this.balance}`);
    }

    removeFromBalance(qty: number): void {
        this.balance -= qty;
        console.log(`Знято з балансу: ${qty}`);
    }

    payrollPayments(): void {
        for (let employee of this.employees) {
            getPaid(employee);
        }
        console.log(`Выплати зарплати для всього персоналу. Поточний баланс: ${this.balance}`);
    }
}