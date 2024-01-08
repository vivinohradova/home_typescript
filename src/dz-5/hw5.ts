abstract class Shape {
    constructor(readonly color: string, readonly name: string) { }

    abstract calculateArea(): number
}

class Circle extends Shape {
    constructor(color: string, name: string, readonly radius: number) {
        super(color, name);
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(color: string, name: string, readonly width: number, readonly height: number) {
        super(color, name);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    print(): void {
        console.log(`Area of Rectangle = ${this.width} x ${this.height}`);
    }

}

class Square extends Rectangle {
    constructor(color: string, name: string, side: number) {
        super(color, name, side, side);
    }

    print(): void {
        console.log(`Area of Square = ${this.width} x ${this.height}`);
    }
}

class Triangle extends Shape {
    constructor(color: string, name: string, readonly baseLength: number, readonly height: number) {
        super(color, name)
    }

    calculateArea(): number {
        return (this.baseLength * this.height) / 2;
    }
}


