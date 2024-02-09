interface INote {
    id: string;
    title: string;
    content: string;
    creationDate: Date;
    editDate: Date;
    status: boolean;
    requireConfirmation: boolean;

    edit(title: string, content: string): void;
    toggleStatus(): boolean;
}

interface INoteManager {
    add(title: string, content: string, requireConfirmation?: boolean): void;
    delete(id: string): void;
    getById(id: string): INote | undefined;
    getCount(): number;
    getUndoneCount(): number;
    search(keyword: string): INote[];
    sortByCreationDate(): void;
}

class Note implements INote {
    id: string;
    title: string;
    content: string;
    creationDate: Date;
    editDate: Date;
    status: boolean;
    requireConfirmation: boolean;

    constructor(id: string, title: string, content: string, requireConfirmation: boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creationDate = new Date();
        this.editDate = new Date();
        this.status = false;
        this.requireConfirmation = requireConfirmation;
    }

    edit(title: string, content: string) {
        this.title = title;
        this.content = content;
        this.editDate = new Date();
        if (this.requireConfirmation) {
            this.status = false;
        }
    }

    toggleStatus():boolean {
        this.status = !this.status;
        return this.status;
    }
}

class NoteManager implements INoteManager {
    private notes: Note[] = [];

    add(title: string, content: string, requireConfirmation: boolean = false) {
        const id = Date.now().toString(); // Генерація унікального ідентифікатора
        const newNote = new Note(id, title, content, requireConfirmation);
        this.notes.push(newNote);
        return id;
    }

    delete(id: string) {
        this.notes = this.notes.filter(note => note.id !== id);
    }

    getById(id: string): INote | undefined {
        return this.notes.find(note => note.id === id);
    }

    getCount(): number {
        return this.notes.length;
    }

    getUndoneCount(): number {
        return this.notes.filter(note => !note.status && !note.requireConfirmation).length;
    }    
 
    search(keyword: string): INote[] {
        return this.notes.filter(note =>
            note.title.toLowerCase().includes(keyword.toLowerCase()) ||
            note.content.toLowerCase().includes(keyword.toLowerCase())
        );
    }


    sortByCreationDate() {
        this.notes.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
    }
}

class TodoListManager {
    private noteManager: NoteManager;
    
    constructor() {
        this.noteManager = new NoteManager();
    }

    addNote(title: string, content: string, requireConfirmation: boolean = false) {
        const id = this.noteManager.add(title, content, requireConfirmation);
        if (!requireConfirmation) {
            const note = this.noteManager.getById(id); 
            if (note) {
                note.toggleStatus();
            }
        }
    }

    deleteNote(id: string) {
        this.noteManager.delete(id);
    }

    getNoteById(id: string): INote | undefined {
        return this.noteManager.getById(id);
    }

    editNote(id: string, title: string, content: string) {
        const note = this.noteManager.getById(id);
        if (note) {
            note.edit(title, content);
        }
    }

    markNoteAsDone(id: string) {
        const note = this.noteManager.getById(id);
        if (note) {
            if (!note.requireConfirmation) {
                note.toggleStatus();
            }
        }
    }

    getNotesCount(): number {
        return this.noteManager.getCount();
    }

    getUndoneNotesCount(): number {
        return this.noteManager.getUndoneCount();
    }

    searchNotes(keyword: string): Note[] {
        return this.noteManager.search(keyword);
    }

    sortNotesByCreationDate() {
        this.noteManager.sortByCreationDate();
    }
}


class TodoList {
    private todoListManager: TodoListManager;

    constructor(todoListManager: TodoListManager) {
        this.todoListManager = todoListManager;
    }

    addNote(title: string, content: string, requireConfirmation: boolean = false) {
        this.todoListManager.addNote(title, content, requireConfirmation);
    }

    deleteNote(id: string) {
        this.todoListManager.deleteNote(id);
    }

    getNoteById(id: string): Note | undefined {
        return this.todoListManager.getNoteById(id);
    }

    editNote(id: string, title: string, content: string) {
        this.todoListManager.editNote(id, title, content);
    }

    markNoteAsDone(id: string) {
        this.todoListManager.markNoteAsDone(id);
    }

    getNotesCount(): number {
        return this.todoListManager.getNotesCount();
    }

    getUndoneNotesCount(): number {
        return this.todoListManager.getUndoneNotesCount();
    }

    searchNotes(keyword: string): Note[] {
        return this.todoListManager.searchNotes(keyword);
    }

    sortNotesByCreationDate() {
        this.todoListManager.sortNotesByCreationDate();
    }
}


const todoListManager: TodoListManager = new TodoListManager();
const todoList: TodoList = new TodoList(todoListManager);
todoList.addNote("Приклад 1", "Зміст першої нотатки");
todoList.addNote("Приклад 2", "Зміст другої нотатки");
todoList.editNote('1', "Приклад 1 (редаговано)", "Зміст першої нотатки (редаговано)");
todoList.markNoteAsDone("1");
console.log(todoList.getNotesCount());
console.log(todoList.getUndoneNotesCount());
console.log(todoList.searchNotes("Приклад"));
todoList.sortNotesByCreationDate();