
// 1

interface IExample {
    [key: string]: number | string
}

// 2

interface ICat {
    [key: string]: (a: number, b: number) => number
}

// 3
interface IMyInterface {
    [key: number]: string[]
}

// 4

interface IBird {
    name: string;
    [key: string]: string | number | boolean
}

// 5

interface IAnimal {
    [key: string]: string;
}

interface IDog extends IAnimal {
    name: "Sharik"
}

// 6

interface INumber {
    [key: string]: number;
    value: number
}

const isNumber = (num: INumber): void => {
    if (typeof num.value === 'number') {
        console.log(`It's a number ${num.value}`)
    } else console.log("Not a number") 
}