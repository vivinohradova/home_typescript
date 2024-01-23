// 1

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Record<string, any> ? DeepReadonly<T[P]> : T[P];
}

// 2

type DeepRequireReadonly <T> = {
    readonly [P in keyof T]-?: T[P] extends Record<string, any> ? DeepRequireReadonly<T[P]> : T[P];
}

// 3

type UpperCaseKeys<T> = {
    [P in keyof T as Uppercase<string & P>]: T[P];
};

// 4

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        value: T[K];
        writable?: boolean;
        enumerable?: boolean;
        configurable?: boolean;
        get?(): T[K];
        set?(value: T[K]): void;
    };
};