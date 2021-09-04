import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState, FormEvent } from "react";
import { http } from "../services/axios";
import styles from "../styles/Get.module.css";
import styles2 from "../styles/Put.module.css";
import { Student } from "../types/Student";
import Button from 'react-bootstrap/Button';
import { Modal, Row, Col, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Put() {
    const [students, setStudents] = useState<Student[]>([]);
    const [show, setShow] = useState(false);
    const [studentEdit, setStudentEdit] = useState<Student>();

    const handleClose = () => setShow(false);
    const handleShow = (id: any) => {
        setStudentEdit(students[students.findIndex((element) => element.id == id)]);
        setShow(true);
    }

    const onChangeInputs = (type: any, element: any) => {
        let studentLocal = Object.assign({}, studentEdit);
        switch (type) {
            case 'name':
                studentLocal.name = element;
                setStudentEdit(studentLocal);
                break;
            case 'email':
                studentLocal.email = element;
                setStudentEdit(studentLocal);
                break;
            case 'birth':
                studentLocal.birth = element;
                setStudentEdit(studentLocal);
                break;
            case 'city':
                studentLocal.city = element;
                setStudentEdit(studentLocal);
                break;
        }
    }

    const submitForm = (e : any) => {
        e.preventDefault();
        http.put(`/students/${studentEdit?.id}`, studentEdit)
        .then((res) => {
            if(res) alert("Usuário Editado com Sucesso");
            else alert("Usuário não encontrado ou erro ao editar o registro !");
        })
        .then(() => window.location.reload())
        .catch((err) => alert(err))
    }

    useEffect(() => {
        http
            .get("/students")
            .then((res) => res.data)
            .then(setStudents)
            .catch(console.error);
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>StudentsAPI</title>
                <meta name="description" content="Students API GET request" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1>
                    <span className="orange">PUT</span> Students
                </h1>
            </header>

            <main className={styles.main}>
                <div className={styles.grid}>
                    {students.map(({ id, name, birth, email, city }) => (
                        <div className={styles.card} key={id}>
                            <h2>{name}</h2>
                            <p>
                                <span>Email:</span> {email}
                            </p>
                            <p>
                                <span>Cidade: </span>
                                {city}
                            </p>
                            <Button variant="outline-warning" onClick={() => handleShow(id)}>Editar</Button>{' '}
                        </div>
                    ))}
                </div>
            </main>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualização de Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>id?: number;
                            <Form.Control type="text" placeholder="Insira o seu nome" value={studentEdit?.name}
                                onChange={e => onChangeInputs('name', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type="text" placeholder="Insira a data no formato YYYY-MM-DD HH24:MI:SS" value={studentEdit?.birth.toString()}
                            onChange={e => onChangeInputs('birth', e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Insira o seu email" value={studentEdit?.email} 
                            onChange={e => onChangeInputs('email', e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Cidade Natal</Form.Label>
                            <Form.Control type="text" placeholder="Insira sua Cidade Natal" value={studentEdit?.city} 
                            onChange={e => onChangeInputs('city', e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" id={styles2.submit} onClick={submitForm} > 
                            Editar Dados
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <footer className={styles.footer}>
                <p>
                    Powered by{" "}
                    <img
                        src="/studenticon.png"
                        alt="StudentsAPI"
                        width={72}
                        height={72}
                    />
                </p>
            </footer>
        </div>
    );
}