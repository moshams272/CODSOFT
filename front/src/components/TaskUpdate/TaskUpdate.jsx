import { useState } from "react";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function TaskUpdate() {
  const { _idProject,_id } = useParams();
  const task=useLoaderData();
  const [title,setTitle]=useState(task.title);
  const [description,setDescription]=useState(task.description);
  const [status,setStatus]=useState(task.status);
  const [deadline,setDeadline]=useState(task.deadline.split("T")[0]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateTask={
      title,
      description,
      status,
      deadline
    };
    try {
      await axiosInstance.patch(`/api/tasks/manager/${_id}`, updateTask);
      navigate(`/dashboard/project/${_idProject}/task/${_id}`);
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
        <Form.Group>
        <p>Status:</p>
            <span style={{
                fontSize:"16px",
                margin:"2vw",
            }}>{status}</span>
            <p style={{marginTop:"2vh",fontSize:"14px"}}>If you want to update status, just choose from one below:</p>
            <div style={{marginBottom:"2vh"}}>
            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>setStatus("Pending")}
            >
              Pending 
            </Button>

            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>setStatus("In Progress")}
            >
              In Progress
            </Button>
            
            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>setStatus("Completed")}
            >
              Completed
            </Button>
                </div>
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
            Update
          </Button>
        </div>
      </Form>
    </main>
  );
}

export const loader=async(arg)=>{
  const response = await axiosInstance.get(`/api/tasks/${arg.params._id}`);
  return response.data.data.task;
}