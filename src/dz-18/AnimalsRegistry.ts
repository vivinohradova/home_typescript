import { IAnimal } from './interfaces';
import Registry from './Registry';

class AnimalsRegistry extends Registry<IAnimal> {
    constructor() {
        super();
    }
}

export default AnimalsRegistry;
