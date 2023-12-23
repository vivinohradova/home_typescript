class School {

    _areas: string[] = [];
    _lecturers: Lecturer[] = [];

    get areas(): string[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(newArea: string): void {
        this._areas.push(newArea);
    }
    removeArea(deletedArea: string): void {
        this._areas = this._areas.filter((area) => area !== deletedArea);
    }

    addLecturer(newLecturer: Lecturer): void {
        this._lecturers.push(newLecturer);
    }
    removeLecturer(deletedLecturer: Lecturer): void {
        this._lecturers = this._lecturers.filter((lecturer) => lecturer.name !== deletedLecturer.name)
    }
}

interface Lecturer {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
}


class Area {
    _levels: Levels[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get levels(): Levels[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }

    addLevel(newLevel: Levels): void {
        this._levels.push(newLevel);
    }
    removeLevel(deletedLevel: Levels): void {
        this._levels = this._levels.filter((level) => level !== deletedLevel)
    }
}

enum Levels {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
}


class Level {

    _groups: string[] = [];
    _name: Levels;
    _description: string;

    constructor(name: Levels, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups(): string[] {
        return this._groups
    }

    get name(): Levels {
        return this._name
    }

    get description(): string {
        return this._description
    }

    addGroup(newGroup: string): void {
        this._groups.push(newGroup);
    }
    removeGroup(deletedGroup: string): void {
        this._groups = this._groups.filter((group) => group !== deletedGroup)
    }
}


class Group {
    _area!: Area;
    _status!: string;
    _students: Student[] = [];
    _directionName: string;
    _levelName: Levels;

    constructor(directionName: string, levelName: Levels) {
        this._directionName = directionName;
        this._levelName = levelName;
    }

    get area(): Area {
        return this._area;
    }

    get status(): string {
        return this._status;
    }

    get students(): Student[] {
        return this._students;
    }

    addStudent(newStudend: Student): void {
        this._students.push(newStudend)
    }

    removeStudent(deletedStudent: Student): void {
        this._students = this._students.filter((student: Student) => student._firstName !== deletedStudent._firstName)
    }

    setStatus(newStatus: string): void {
        this._status = newStatus;
    }

    showPerformance(): Student[] {
        const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}


class Student {

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: { [workName: string]: number } = {}; // workName: mark
    _visits: { [lesson: string]: boolean } = {}; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }
    setVisit(lesson: string, present: boolean): void {
        this._visits[lesson] = present;
    }

    getPerformanceRating(): number {
        const gradeValues = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (Object.values(this._visits).filter(present => present).length / Object.keys(this._visits).length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }


}