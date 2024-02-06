// 1

function exampleFunction(param: boolean): void { }

type ResultType<T> = T extends (param: infer U) => void ? U : undefined;

let a: ResultType<typeof exampleFunction>;

// 2

type FunctionInfo<T> = T extends (param: infer P) => infer R ? [P, R] : undefined;

function foo(param: boolean): string {
    return param ? "Hello" : "World";
}

const info: FunctionInfo<typeof foo> = [true, "Hello"];

