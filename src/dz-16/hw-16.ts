// // 1
// interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     isAdmin: boolean;
// }

// type User = {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     isAdmin: boolean;
// };

// // 2
// interface IMathFunction {
//     (x: number, y: number): number;
// }

// type MathFunction = (x: number, y: number) => number;

// // 3
// type Age = number;
// type Result = 'success' | 'error';
// type Coordinates = [number, number];

// // 4
// // a
// interface IAnimal {
//     name: string;
// }

// interface Cat extends IAnimal {
//     breed: string;
// }

// // b
// type Point = {
//     x: number;
//     y: number;
// };

// interface ILabeledPoint extends Point {
//     label: string;
// }

// // c
// interface IPerson {
//     name: string;
//     age: number;
// }

// type JobTitle = IPerson & {
//     position: string;
// };

// // d
// type Bus = {
//     type: string;
// };

// type Car = Bus & {
//     brand: string;
// };

// // 5
// interface Animal {
//     makeSound(): void;
// }

// class Dog implements Animal {
//     makeSound(): void {
//         console.log("Woof!");
//     }
// }

// const dog = new Dog();
// dog.makeSound(); // Виведе: Woof!


// type Person = {
//     name: string;
//     age: number;
// };

// class JobEmployee implements Person {
//     constructor(public name: string, public age: number, public position: string) {}
// }

// const employee = new JobEmployee("Vikky", 30, "Developer");
// console.log(employee); // Виведе: JobEmployee { name: 'Vikky', age: 30, position: 'Developer' }

// /** 
// type AnimalType = {
//     name: string;
// } | {
//     type: string;
// };

// class Fox implements AnimalType {
//     constructor(public name: string) {}
// }
// Помилка: Клас може реалізувати лише тип об’єкта або перетин типів об’єктів зі статично відомими членами

//  Псевдоніми типів призначені для створення нових іменованих типів або аліасів для існуючих типів,
//  але вони не є реальними типами даних, як інтерфейси або класи.
// */

// // 6

// interface IPet {
//     name: string;
//     age: number;
// }

// interface IPet {
//     species: string;
// }

// const myPet: IPet = {
//     name: "Marty",
//     age: 2,
//     species: "Cat"
// };

// console.log(myPet);
