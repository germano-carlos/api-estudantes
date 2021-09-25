import app from "..";
import supertest from "supertest";

describe("Test student requests", () => {

  it("should return a specific student by id", async () => {
    const id = 1;
    await supertest(app)
      .get(`/students/${id}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject({
          id: 1,
          name: "John Doe",
          email: "john.doe1@example.com",
          city: "Belo Horizonte",
          birth: new Date("11/13/1999").toISOString(),
        });
      });
  });

  it("should return false! when trying to list an inexistent or invalid student", async () => {
    const id = -1;
    await supertest(app)
      .get(`/students/${id}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBe(false);
      });
  });


  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe1@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
          {
            id: 2,
            name: "John Doe 2",
            email: "john.doe2@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
          {
            id: 3,
            name: "John Doe 3",
            email: "john.doe3@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
          {
            id: 4,
            name: "John Doe 4",
            email: "john.doe4@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ]);
      }
      );
  });

  it("should return an empty object when trying to create a new student without required params", async () => {
    const newStudent = {
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toStrictEqual({}));
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 5, ...newStudent }));
  });

  it("should return false! when trying to update an inexistent or invalid student", async () => {
    const id = null; // You can inset values like null, > 4, < 0
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put(`/students/${id}`)
      .send(newStudent)
      .then((res) => expect(res.body).toBe(false));
  });

  it("should update an student", async () => {
    const id = 1;
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put(`/students/${id}`)
      .send(newStudent)
      .then((res) => expect(res.body).toBe(true));

    await supertest(app)
      .get(`/students`)
      .then((res) => {
        let index = res.body.findIndex((element: any) => element.id == id);
        expect(res.body[index]).toMatchObject({ id, ...newStudent });
      });

  });

  it("should return false! when trying to delete an inexistent or invalid student", async () => {
    const id = null; // You can inset values like null, > 4, < 0
    await supertest(app)
      .delete(`/students/${id}`)
      .then((res) => expect(res.body).toBe(false));
  });

  it("should delete an student", async () => {
    const id = 1;
    await supertest(app)
      .delete(`/students/${id}`)
      .then((res) => expect(res.body).toBe(true));

    await supertest(app)
      .get(`/students`)
      .then((res) => {
        let index = res.body.findIndex((element: any) => element.id == id);
        expect(index).toBe(-1);
      });

  });

});
