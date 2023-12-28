// 1
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    division(a: number, b: number): number;

}

const calculate = (calculator: Calculator, operation: string, a: number, b: number): number => {
    switch (operation) {
        case 'add':
            return calculator.add(a, b);
        case 'subtract':
            return calculator.subtract(a, b);
        case 'multiply':
            return calculator.multiply(a, b);
        case 'division':
            return calculator.division(a, b);
        default: throw new Error('Error operation!')

    }
}

const calculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    division: (a, b) => a / b,
};

const result = calculate(calculator, 'add', 10, 25);
console.log(result);

// 2

interface Book {
    id: number;
    title: string;
    author: Author;
}

interface Author {
    id: number;
    name: string;
}

interface BookService {
    getBookById(id: number): Book | undefined;
    getAuthorById(id: number): Author | undefined;
}

const bookService: BookService = {
    getBookById: (id: number): Book | undefined => {
        const books: Book[] = [
            { id: 1, title: "Book1", author: { id: 11, name: "Author1" } },
            { id: 2, title: "Book2", author: { id: 22, name: "Author2" } },
            { id: 3, title: "Book3", author: { id: 33, name: "Author3" } },
        ]

        const findBook = books.find((book: Book) => book.id === id);

        return findBook;
    },

    getAuthorById: (id: number): Author | undefined => {
        const authors: Author[] = [
            { id: 11, name: "Author1" },
            { id: 22, name: "Author2" },
            { id: 33, name: "Author3" }
        ]

        const findAuthor = authors.find((author: Author) => author.id === id);

        return findAuthor;
    }

}

