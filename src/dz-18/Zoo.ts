import Administration from './Administration';
import Budget from './Budget';

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

export default Zoo;
