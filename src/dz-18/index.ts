import Cashier from './Cashier';
import MarketingDepartment from './MarketingDepartment';
import Zoo from './Zoo';

const zoo = new Zoo(80000);

const budget = zoo.getBudget();
console.log('Поточний бюджет зоопарку:', budget.getBalance());

const closingTime = new Date();
closingTime.setHours(18, 0, 0);
const cashier = new Cashier(closingTime);
console.log('Час закриття зоопарку:', closingTime.toLocaleTimeString());

const marketingDepartment = new MarketingDepartment();

const lion: IAnimal = { species: 'Лев', name: 'Сімба', age: '3', health: 'Відмінно' };
const elephant: IAnimal = { species: 'Слон', name: 'Дамбо', age: '10', health: 'Добре' };
zoo.getAdministration().addAnimal(lion);
zoo.getAdministration().addAnimal(elephant);
console.log('Тварини у зоопарку:');
console.log('1. Лев: ', lion);
console.log('2. Слон: ', elephant);

const zookeeper: IEmployee = {
  name: 'Олексій Іванов',
  position: 'Доглядач зоопарку',
  salary: 3000,
  responsibilities: ['Годування тварин', 'Прибирання вольєрів'],
};
const veterinarian: IEmployee = {
  name: 'Анна Сміт',
  position: 'Ветеринар',
  salary: 4000,
  responsibilities: ['Медичний догляд за тваринами'],
};
zoo.getAdministration().addEmployee(zookeeper);
zoo.getAdministration().addEmployee(veterinarian);
console.log('Працівники зоопарку:');
console.log('1. Доглядач зоопарку: ', zookeeper);
console.log('2. Ветеринар: ', veterinarian);

const visitor1: IVisitor = { name: 'Аліса', contactInfo: 'alice@example.com' };
const visitor2: IVisitor = { name: 'Ігор', contactInfo: 'igor@example.com' };
const ticketPrice1 = cashier.sellTicket('adult', visitor1);
const ticketPrice2 = cashier.sellTicket('child', visitor2);

const dailyRevenue = cashier.getDailyRevenue();
zoo.getBudget().addRevenue(ticketPrice1 + ticketPrice2);

console.log(`Продано квиток для ${visitor1.name} по ціні ${ticketPrice1} $`);
console.log(`Продано квиток для ${visitor2.name} по ціні ${ticketPrice2} $`);
console.log(`Щоденний прибуток: ${dailyRevenue} $`);

const currentVisitors = cashier.getVisitors();
console.log('Поточні відвідувачі:');
currentVisitors.forEach(visitor => {
  console.log(`${visitor.name} (${visitor.contactInfo})`);
});

marketingDepartment.addClient(visitor1);
marketingDepartment.addClient(visitor2);
marketingDepartment.sendAdvertisements('Спеціальна подія в зоопарку цієї суботи!');

const currentVisitorsInstance = cashier['currentVisitors'];

if (currentVisitorsInstance) {
  currentVisitorsInstance.sendClosingNotification();
} else {
  console.log('Нема поточних відвідувачів.');
}

const updatedBudget = zoo.getBudget();
console.log('Оновлений бюджет зоопарку:', updatedBudget.getBalance());
const financialReport = `Фінансовий звіт: Баланс: ${updatedBudget.getBalance()}, Доходи: ${updatedBudget.getRevenue()}, Витрати: ${updatedBudget.getExpenses()}`;
console.log(financialReport);

export { zoo, cashier, marketingDepartment };
