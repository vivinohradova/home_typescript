
type ReplacementInfo = {
    reason: string;
    alternativeMethod: string;
};

function DeprecatedMethod<T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>,
    replacementInfo: ReplacementInfo
) {
    if (context.kind !== 'method') throw new Error('Method-only decorator');
    function replacementMethod(this: T, ...args: A): R {
        console.warn(
            `${String(
                context.name
            )} is deprecated: ${replacementInfo.reason}. Use ${replacementInfo.alternativeMethod} instead.`
        )
        return originalMethod.apply(this, args)
    }
    return replacementMethod;
}

function MinLength(min: number) {
    return function (target: any, key: string) {
        let value = target[key];

        const getter = function () {
            return value;
        };

        const setter = function (newVal: any) {
            if (newVal.length < min) {
                throw new Error(`Value must be at least ${min} characters long`);
            }
            value = newVal;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

function MaxLength(max: number) {
    return function (target: any, key: string) {
        let value = target[key];

        const getter = function () {
            return value;
        };

        const setter = function (newVal: any) {
            if (newVal.length > max) {
                throw new Error(`Value must be at most ${max} characters long`);
            }
            value = newVal;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

function Email(target: any, key: string) {
    let value = target[key];

    const emailRegex = /\S+@\S+\.\S+/;

    const getter = function () {
        return value;
    };

    const setter = function (newVal: any) {
        if (!emailRegex.test(newVal)) {
            throw new Error(`Invalid email format`);
        }
        value = newVal;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
