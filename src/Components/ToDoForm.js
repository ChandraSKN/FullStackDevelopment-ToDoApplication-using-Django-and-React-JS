import React, { useState } from "react";
import { Button, FormControl, Card, Row, Form } from "react-bootstrap";
import axios from "axios";

function ToDoForm({ onAdd }) {
  const [todo, setTodo] = useState({
    name: "",
    date: "",
    time: "",
    status: false,
  });
  const showItems = todo.name && todo.date && todo.time;

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:8000/api/todo/", {
        name: todo.name,
        date: todo.date,
        time: todo.time,
        status: todo.status,
      })
      .then((res) => {
        window.location.reload();

      })
      .catch((error) => {
        console.error(error);
      });
    setTodo({
      name: "",
      date: "",
      time: "",
      status: false,
    });

  };

  return (
    <Card>
      <Card.Header>Enter you task Details</Card.Header>
      <Card.Body>
        <Card.Text>
          <FormControl
            as="textarea"
            placeholder="New To Do"
            name="name"
            onChange={handleChange}
            value={todo.name}
          />
        </Card.Text>
        <Card.Text>
          <FormControl
            type="date"
            placeholder="Date"
            name="date"
            onChange={handleChange}
            value={todo.date}
          />
        </Card.Text>
        <Card.Text>
          <FormControl
            type="time"
            placeholder="Time"
            name="time"
            onChange={handleChange}
            value={todo.time}
          />
        </Card.Text>

        <Form.Check
          type="switch"
          name="status"
          label="Check the box if the task is completed"
          checked={todo.status}
          onChange={handleCheckboxChange}
          style={{ textAlign: "left" }}
        >
        </Form.Check>

        <Row className="mt-2">
          <Button disabled={!showItems} onClick={handleSubmit} type="submit">Add</Button>
        </Row>
      </Card.Body>
    </Card>

  );
}

export default ToDoForm;
