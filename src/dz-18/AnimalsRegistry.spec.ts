import AnimalsRegistry from './AnimalsRegistry';
import { IAnimal } from './interfaces';

describe('AnimalsRegistry', () => {
  let animalsRegistry: AnimalsRegistry;

  beforeEach(() => {
    animalsRegistry = new AnimalsRegistry();
  });

  describe('addItem', () => {
    it('should add an item to the registry', () => {
      const animal: IAnimal = {
        species: 'Lion',
        name: 'Simba',
        age: '3',
        health: 'Excellent',
      };

      animalsRegistry.addItem(animal);
      const items = animalsRegistry.getItems();
      expect(items).toContain(animal);
    });
  });

  describe('getItems', () => {
    it('should return an empty array if no items have been added', () => {
      const items = animalsRegistry.getItems();
      expect(items).toEqual([]);
    });

    it('should return the list of added items', () => {
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

      animalsRegistry.addItem(animal1);
      animalsRegistry.addItem(animal2);

      const items = animalsRegistry.getItems();
      expect(items).toContain(animal1);
      expect(items).toContain(animal2);
      expect(items.length).toBe(2);
    });
  });
});
