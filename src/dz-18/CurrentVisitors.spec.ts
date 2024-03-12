import CurrentVisitors from './CurrentVisitors';
import { IVisitor } from './interfaces';

describe('CurrentVisitors', () => {
  let currentVisitors: CurrentVisitors;

  beforeEach(() => {
    const closingTime = new Date(Date.now() + 15 * 60 * 1000);
    currentVisitors = new CurrentVisitors(closingTime);
  });

  describe('addVisitor', () => {
    it('Should add a visitor to the list', () => {
      const visitor: IVisitor = { name: 'John Doe', contactInfo: 'john@example.com' };
      currentVisitors.addVisitor(visitor);
      expect(currentVisitors.getVisitors()).toContain(visitor);
    });
  });

  describe('getVisitors', () => {
    it('Should return the list of visitors', () => {
      const visitors: IVisitor[] = [
        { name: 'John Doe', contactInfo: 'john@example.com' },
        { name: 'Jane Smith', contactInfo: 'jane@example.com' },
      ];

      visitors.forEach(visitor => currentVisitors.addVisitor(visitor));

      const retrievedVisitors = currentVisitors.getVisitors();

      expect(retrievedVisitors).toEqual(visitors);
    });
  });

  describe('sendClosingNotification', () => {
    it('Should send a closing notification when closing time is near', () => {
      const consoleLogMock = jest.spyOn(console, 'log');

      currentVisitors.sendClosingNotification();

      expect(consoleLogMock).toHaveBeenCalledTimes(1);

      consoleLogMock.mockRestore();
    });
  });

  describe('notifyOnDeparture', () => {
    it('should call console.log for each visitor', () => {
      const visitors = [
        { name: 'John Doe', contactInfo: 'john@example.com' },
        { name: 'Jane Smith', contactInfo: 'jane@example.com' },
      ];

      const currentVisitors = new CurrentVisitors(new Date());
      visitors.forEach(visitor => currentVisitors.addVisitor(visitor));

      const consoleLogMock = jest.spyOn(console, 'log');

      currentVisitors.notifyOnDeparture();

      visitors.forEach(visitor => {
        expect(consoleLogMock).toHaveBeenCalledWith(`Оповіщено відвідувача ${visitor.name} (${visitor.contactInfo})`);
      });

      expect(consoleLogMock).toHaveBeenCalledTimes(2 + 1);
      consoleLogMock.mockRestore();
    });
  });
});
