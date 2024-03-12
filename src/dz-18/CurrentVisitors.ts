import { IVisitor } from './interfaces';

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
    console.log('Оповіщення відвідувачів перед відходом:');
    this.visitors.forEach(visitor => {
      console.log(`Оповіщено відвідувача ${visitor.name} (${visitor.contactInfo})`);
    });
  }
}

export default CurrentVisitors;
