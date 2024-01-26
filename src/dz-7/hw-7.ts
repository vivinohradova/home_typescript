// 1

const filterArray = <T>(array: T[], condition: (item: T) => boolean): T[] => array.filter(condition);

// 2

class Stack <T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}

// 3

class Dictionary<K extends string | number, V> {
    private data: { [key in K]: V } = {} as { [key in K]: V };

    set(key: K, value: V): void {
        this.data[key] = value;
    }

    get(key: K): V | undefined {
        return this.data[key];
    }

    has(key: K): boolean {
        return key in this.data;
    }
}