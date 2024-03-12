import { IRevenue } from './interfaces';

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

export default Revenue;
