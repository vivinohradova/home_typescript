type Uuid = number;

interface INote {
    id: Uuid;
    title: string;
    text: string;
    updatedAt: Date | null;
    createdAt: Date;
    status: boolean;
    update: (payload: INoteUpdated) => void;
    complete: () => void;
}

interface ISearchable {
    search: (id: Uuid) => INote[];
}

interface INoteSorting {
    sortByStatus(): void;
    sortByCreatedAt(): void;
}

type INoteUpdated = Partial<Pick<INote, 'title' | 'text'>>;

interface ITodoList {
    allCount: number;
    incompletedCount: number;

    create: (title: string, content: string) => void;
    delete: (id: Uuid) => INote;
    update: (id: Uuid, payload: INoteUpdated) => INote;
    getNoteById: (id: Uuid) => INote | undefined;
    getNotes: () => INote[];
    complete: (id: Uuid) => void;

}

class TodoList implements ITodoList {
    protected notes: INote[] = [];

    get allCount(): number {
        return this.notes.length;
    }

    get incompletedCount(): number {
        return this.notes.filter(x => !x.status).length;
    }

    public create(title: string, text: string): void {
        if (!title.trim() || !text.trim()) {
            throw new Error("Note can't be empty!");
        }
        const note = new Note(title, text);
        this.notes.push(note);
    }

    public delete(id: Uuid): INote {
        const noteIndex = this.findByIndex(id);

        const [removeNote] = this.notes.splice(noteIndex, 1);
        return removeNote;
    }
    public update(id: Uuid, payload: INoteUpdated): INote {
        const noteIndex = this.findByIndex(id);
        const note = this.notes[noteIndex];
        const oldNote = { ...note };
        note.update(payload);
        return note;

    }
    public getNoteById(id: Uuid): INote | undefined {
        const note = this.notes[this.findByIndex(id)];
        if (!note) {
            throw new Error('Haven`t notes');
        }
        return note;
    }
    public getNotes(): INote[] {
        return this.notes;
    }
    public complete(id: Uuid): void {
        const noteIndex = this.findByIndex(id);
        const note = this.notes[noteIndex];
        note.complete();
    }
    private findByIndex(id: Uuid): number {
        const noteIndex = this.notes.findIndex((x) => x.id === id);
        if (noteIndex === -1) {
            throw new Error(`${id} is not defined!`);
        }
        return noteIndex;
    }

}

class TodoListWithSearch extends TodoList implements ISearchable {
    public search(id: Uuid): INote[] {
        return this.notes.filter(note =>
            note.title.toLowerCase().includes(id.toString()) ||
            note.text.toLowerCase().includes(id.toString()));
    }
}

class TodoListWithSorting extends TodoList implements INoteSorting {
    sortByStatus(): void {
        this.notes.sort((a, b) => {
            return a.status === b.status ? 0 : a.status ? 1 : -1;
        });
    }

    sortByCreatedAt(): void {
        this.notes.sort((a, b) => {
            return a.createdAt.getTime() - b.createdAt.getTime();
        });
    }
}

abstract class BaseNote implements INote {
    readonly id: Uuid = Math.random() * (100 - 0) + 0;
    readonly createdAt = new Date();

    updatedAt: Date | null = null;
    status = false;

    constructor(public title: string, public text: string) { }

    public complete(): void {
        this.status = true;
    }

    public abstract update(params: INoteUpdated & { [key: string]: any }): void;

}

class Note extends BaseNote {

    public update({ title, text }: INoteUpdated): void {
        if (title?.trim()) {
            this.title = title;
        }
        if (text?.trim()) {
            this.text = text;
        }
        this.updatedAt = new Date();
    }
}


class NoteConfirmed extends BaseNote {
    public update({ title, text }: INoteUpdated, confirm: boolean = false): void {
        if (!confirm) return;
        if (title?.trim()) {
            this.title = title;
        }
        if (text?.trim()) {
            this.text = text;
        }
        this.updatedAt = new Date();
    }
}

const todoList = new TodoList();

todoList.create("Title1", "Text1");
todoList.create("Title2", "Text2");

// Отримуємо всі нотатки
const notes = todoList.getNotes();
console.log("All notes:", notes);


// // Видаляємо другу нотатку
const secondNoteId = notes[1].id;
const deletedNote = todoList.delete(secondNoteId);
console.log("Видалена нотатка:", deletedNote);


// // Отримуємо кількість всіх та незавершених нотаток
console.log("Загальна кількість нотаток:", todoList.allCount);
console.log("Кількість незавершених нотаток:", todoList.incompletedCount);