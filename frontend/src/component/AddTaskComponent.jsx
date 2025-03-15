import { useEffect, useState } from "react";
import {
  createTask,
  retrieveTaskById,
  updateTask,
} from "../service/TaskApiService";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddTaskComponent = userId => {
  const [task, setTask] = useState("");
  const [completed, setCompleted] = useState(false);
  const taskCreatedAt = new Date().toISOString();
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ task: "" });
  console.log("id is here", id);

  useEffect(() => {
    if (id) {
      retrieveTaskById(id)
        .then(response => {
          console.log(response.data.object);
          setTask(response.data.object.task);
          setCompleted(response.data.object.completed);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  function saveTask(event) {
    event.preventDefault();
    if (validateForm()) {
      const taskObj = {
        task,
        completed,
        taskCreatedAt,
        updatedAt: new Date().toISOString(), // Add updatedAt field
      };
      if (id) {
        updateTask(taskObj, id)
          .then(() => {
            toast.dismiss();
            toast.success("Task Add successfully!");
            navigate("/tasks");
          })
          .catch(error => {
            toast.dismiss();
            toast.error("Failed to Add task!");
            console.error(error);
          });
      } else {
        createTask(taskObj, userId)
          .then(() => {
            toast.dismiss();
            toast.success("Task updated successfully!");
            navigate("/tasks");
          })
          .catch(error => {
            toast.dismiss();
            toast.error("Failed to update task!");
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (task.trim()) {
      errorsCopy.task = "";
    } else {
      errorsCopy.task = "Task field is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function AddUpdateText() {
    if (id) {
      return "Update";
    } else {
      return "Add";
    }
  }
  console.log("this is the id", id);

  return (
    <div className="d-flex  justify-content-center align-items-center min-vh-100 task-comp">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow rounded-lg">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center  mb-4 ">
                  <h2 className="m-0">{AddUpdateText()} Task</h2>
                </div>
                <Form onSubmit={saveTask}>
                  <Form.Group controlId="formTask">
                    <Form.Label className="text-success fw-bold">
                      Task Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Enter task description."
                      value={task}
                      onChange={event => setTask(event.target.value)}
                      isInvalid={!!errors.task}
                      className="rounded-lg"
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {errors.task}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    className="mt-3 w-100 rounded-pill "
                  >
                    {AddUpdateText()} Task
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddTaskComponent;
