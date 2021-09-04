import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();
    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);
    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async delete(req: Request, res: Response) {
    const newStudent = await StudentsDB.deleteStudent(parseInt(req.params.id));
    return res.status(StatusCodes.OK).json(newStudent);
  }

  async put(req: Request, res: Response) {
    const newStudent = await StudentsDB.putStudent(parseInt(req.params.id), req.body);
    return res.status(StatusCodes.OK).json(newStudent);
  }
}
