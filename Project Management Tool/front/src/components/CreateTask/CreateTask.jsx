import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CreateTask(){
    const { _id } = useParams();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [deadline,setDeadline]=useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createTask={
      title,
      description,
      project:_id,
      deadline
    };
    try {
      await axiosInstance.post(`/api/tasks/manager`, createTask);
      navigate(`/dashboard/project/${_id}`);
    } catch (err) {
      let error = err.response.data.message;
      if (error.startsWith("Task validation failed: ")) {
        error = error.slice("Task validation failed: ".length);
      }
      setError(error);
    }
  };
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        width: "40vw",
      }}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(evn) => {
              setTitle(evn.target.value);
              setError("");
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(evn) => {
              setDescription(evn.target.value);
              setError("");
            }}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter deadline in YYYY-MM-DD as 2022-03-31"
            value={deadline}
            onChange={(evn) => {
              setDeadline(evn.target.value);
              setError("");
            }}
          />

        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "1vh",
              }}
            >
              {error}
            </div>
          )}
          <Button
            variant="outline-secondary"
            type="submit"
            style={{ padding: "1vh 1.5vw", color: "#dfdfdf" }}
          >
            Create Task
          </Button>
        </div>
      </Form>
    </main>
  );
}