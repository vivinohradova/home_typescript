// class School {
//   directions: string[] = [];

//   addDirection(direction: string): void {
//     this.directions.push(direction);
//   }
// }

// class Direction {
//   _name: string;
//   levels: (string | number)[] = [];

//   get name(): string {
//     return this._name;
//   }

//   constructor(name: string) {
//     this._name = name;
//   }

//   addLevel(level: string | number): void {
//     this.levels.push(level);
//   }
// }

// class Level {
//   groups: any[] = [];
//   _name: string;
//   _program: string;

//   constructor(name: string, program: string) {
//     this._name = name;
//     this._program = program;
//   }

//   get name(): string {
//     return this._name;
//   }

//   get program(): string {
//     return this._program;
//   }

//   addGroup(group: any): void {
//     this.groups.push(group);
//   }
// }

// class Group {
//   _students: any[] = [];

//   directionName: string;
//   levelName: string;

//   get students(): any[] {
//     return this._students;
//   }

//   constructor(directionName: string, levelName: string) {
//     this.directionName = directionName;
//     this.levelName = levelName;
//   }

//   addStudent(student: string): void {
//     this._students.push(student);
//   }

//   showPerformance(): any[] {
//     const sortedStudents = this.students.sort(
//       (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
//     );

//     return sortedStudents;
//   }
// }

// class Student {
//   grades: any = {};
//   attendance: boolean[] = [];

//   constructor(
//     public firstName: string,
//     public lastName: string,
//     public birthYear: number
//   ) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.birthYear = birthYear;
//   }

//   get fullName(): string {
//     return `${this.lastName} ${this.firstName}`;
//   }

//   set fullName(value: string) {
//     [this.lastName, this.firstName] = value.split(" ");
//   }

//   get age(): number {
//     return new Date().getFullYear() - this.birthYear;
//   }

//   setGrade(subject: string, grade: number): void {
//     this.grades[subject] = grade;
//   }

//   markAttendance(present: boolean): void {
//     this.attendance.push(present);
//   }

//   getPerformanceRating(): number {
//     const gradeValues: number[] = Object.values(this.grades);

//     if (gradeValues.length === 0) return 0;

//     const averageGrade =
//       gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

//     const attendancePercentage =
//       (this.attendance.filter((present) => present).length /
//         this.attendance.length) *
//       100;

//     return (averageGrade + attendancePercentage) / 2;
//   }
// }
