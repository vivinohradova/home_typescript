import Revenue from './Revenue';

describe('Revenue', () => {
  let revenue: Revenue;

  beforeEach(() => {
    revenue = new Revenue();
  });

  it('Should initialize daily revenue to 0', () => {
    expect(revenue.getDailyRevenue()).toBe(0);
  });

  it('Should add revenue correctly', () => {
    revenue.addRevenue(100);
    expect(revenue.getDailyRevenue()).toBe(100);

    revenue.addRevenue(50);
    expect(revenue.getDailyRevenue()).toBe(150);
  });
});
