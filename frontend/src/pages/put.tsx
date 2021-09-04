import Head from "next/head";
import React, { useEffect, useState } from "react";
import { http } from "../services/axios";
import styles from "../styles/Get.module.css";
import { Student } from "../types/Student";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";


export default function Put() {
    const [students, setStudents] = useState<Student[]>([]);

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
                    {students.map(({ id, name, email, city }) => (
                        <div className={styles.card} key={id}>
                            <h2>{name}</h2>
                            <p>
                                <span>Email:</span> {email}
                            </p>
                            <p>
                                <span>Cidade: </span>
                                {city}
                            </p>
                            <Button variant="outline-warning">Editar</Button>{' '}
                        </div>
                    ))}
                </div>
                <div>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </main>

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