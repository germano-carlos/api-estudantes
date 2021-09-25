import { Student } from "../types/Student";

let students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe1@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 2,
    name: "John Doe 2",
    email: "john.doe2@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 3,
    name: "John Doe 3",
    email: "john.doe3@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
  {
    id: 4,
    name: "John Doe 4",
    email: "john.doe4@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
function getStudents(id: any) {
  if (id == null)
    return Promise.resolve(Object.freeze([...students]));

  let index = students.findIndex((element) => element.id == id);
  if (index == -1) return Promise.resolve(false);

  return Promise.resolve(Object.freeze(students[index]));;
}

function deleteStudent(id: number) {
  let index = students.findIndex((element) => element.id == id);
  if (index == -1) return Promise.resolve(false);

  students.splice(index, 1);
  return Promise.resolve(index != -1);
}

function putStudent(id: number, student: Student) {
  let index = students.findIndex((element) => element.id == id);
  if (index == -1) return Promise.resolve(false);

  students[index] = { id, ...student };
  return Promise.resolve(true);
}

export { addStudent, getStudents, deleteStudent, putStudent };
