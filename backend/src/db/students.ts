import { getConnection, getRepository } from "typeorm";
import { Student } from "../entities/Student";

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
async function addStudent(student: Student) {
  let response = await getConnection().getRepository(Student).save(student);
  return Promise.resolve(Object.freeze(response));
}

/**
 * Returns student list
 * @returns Students
 */
async function getStudents(id: any) {
  const stud = await getConnection().getRepository(Student).find();

  if (id == null)
    return stud

  let index = stud.findIndex((element) => element.id == id);
  if (index == -1) return Promise.resolve(false);

  return Promise.resolve(Object.freeze(stud[index]));
}

async function deleteStudent(id: number) {
  return Promise.resolve(await getConnection().getRepository(Student).delete(id));
}

async function putStudent(id: number, student: Student) {
  const property = await getConnection().getRepository(Student).findOne({
    where: { id }
  });
  
  return await getConnection().getRepository(Student).save({
    ...property, // existing fields
    ...student // updated fields
  });
}

export { addStudent, getStudents, deleteStudent, putStudent };
