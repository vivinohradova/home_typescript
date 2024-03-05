
// function DeprecatedMethod(reason: string, alternativeMethod?: string) {
//     return function(_target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
//         console.warn(`Method "${propertyKey}" is deprecated: ${reason}`);
//         if (alternativeMethod) {
//             console.warn(`You can use "${alternativeMethod}" instead.`);
//         }
//     };
// }



// function MinLength(min: number) {
//     return function (target: any, key: string) {
//         let value = target[key];

//         const getter = function () {
//             return value;
//         };

//         const setter = function (newVal: any) {
//             if (newVal.length < min) {
//                 throw new Error(`Value must be at least ${min} characters long`);
//             }
//             value = newVal;
//         };

//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//             enumerable: true,
//             configurable: true,
//         });
//     };
// }

// function MaxLength(max: number) {
//     return function (target: any, key: string) {
//         let value = target[key];

//         const getter = function () {
//             return value;
//         };

//         const setter = function (newVal: any) {
//             if (newVal.length > max) {
//                 throw new Error(`Value must be at most ${max} characters long`);
//             }
//             value = newVal;
//         };

//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//             enumerable: true,
//             configurable: true,
//         });
//     };
// }

// function Email(target: any, key: string) {
//     let value = target[key];

//     const emailRegex = /\S+@\S+\.\S+/;

//     const getter = function () {
//         return value;
//     };

//     const setter = function (newVal: any) {
//         if (!emailRegex.test(newVal)) {
//             throw new Error(`Invalid email format`);
//         }
//         value = newVal;
//     };

//     Object.defineProperty(target, key, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true,
//     });
// }


// class User {
//     @DeprecatedMethod("This method is deprecated due to security vulnerabilities", "newMethod")
//     updateEmailAddress(email: string) {
//         console.log(`Updating email address to: ${email}`);
//     }

//     @MinLength(6)
//     @MaxLength(20)
//     username: string = "";

//     @Email
//     email: string ="";
// }

// const user = new User();
// user.updateEmailAddress("test@example.com");
// user.username = "user123";
// user.email = "invalid-email";

//Method "updateEmailAddress" is deprecated: This method is deprecated due to security vulnerabilities
// You can use "newMethod" instead.
// Updating email address to: test@example.com