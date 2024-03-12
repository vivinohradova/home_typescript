import { IEmployee } from './interfaces';
import Registry from './Registry';

class EmployeesRegistry extends Registry<IEmployee> {
    constructor() {
        super();
    }
}

export default EmployeesRegistry;
