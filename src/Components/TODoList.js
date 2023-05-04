import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import ToDoForm from "./ToDoForm";
import { Row, Col } from "react-bootstrap";
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Button, Table, Form, Card, FormControl } from 'react-bootstrap';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);



    useEffect(() => {
        axios.get("http://localhost:8000/api/todo/")
            .then((res) => {
                setTodos(res.data)
            })
            .catch(() => {
                console.log("Check the data once")
            })
    }, [])
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/todo/${id}/`)
            .then((res) => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(() => {
                console.log("Failed to delete item");
            })
    }
    const handleEdit = (todo) => {
        setEditingTodo(todo);
    };


    const handleUpdate = (todo) => {
        axios
            .put(`http://localhost:8000/api/todo/${todo.id}/`, todo)
            .then((res) => {
                const updatedTodos = todos.map((t) =>
                    t.id === todo.id ? res.data : t
                );
                setTodos(updatedTodos);
                setEditingTodo(null);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {editingTodo && (
                <Modal show={true} onHide={() => setEditingTodo(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            as="textarea"
                            className="form-control"
                            value={editingTodo.name}
                            onChange={(e) => setEditingTodo({ ...editingTodo, name: e.target.value })}
                        />
                        <FormControl
                            type="date"
                            className="form-control mt-2"
                            value={editingTodo.date}
                            onChange={(e) => setEditingTodo({ ...editingTodo, date: e.target.value })}
                        />
                        <FormControl
                            type="time"
                            className="form-control mt-2"
                            value={editingTodo.time}
                            onChange={(e) => setEditingTodo({ ...editingTodo, time: e.target.value })}
                        />
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Completed"
                                    checked={editingTodo.status}
                                    onChange={(e) =>
                                        setEditingTodo({ ...editingTodo, status: e.target.checked })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setEditingTodo(null)}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleUpdate(editingTodo)}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <Row className="mt-4">
                <Col md={2}></Col>
                <Col md={4}>
                    <ToDoForm />
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>Details of your task</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map(todo => (
                                        <tr key={todo.id}>
                                            <td>{todo.name}</td>
                                            <td>{todo.date}</td>
                                            <td>{todo.time}</td>
                                            <td>{todo.status ? 'Done' : 'Pending'}</td>
                                            <td>
                                                <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(todo)} />
                                                <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(todo.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    );


}

export default ToDoList;