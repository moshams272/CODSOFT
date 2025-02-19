import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AssignTask(){
    const { _idProject ,_id } = useParams();
    const [email,setEmail]=useState("");
    const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/api/tasks/manager/assign/${_id}`, {email:email});
      navigate(`/dashboard/project/${_idProject}/task/${_id}`);
    } catch (err) {
      let error = err.response.data.message;
      if (error.startsWith("Task validation failed: ")) {
        error = error.slice("Task validation failed: ".length);
      }
      setError(error);
    }
  };
    return(
        <main style={{width:"95vw",height:"80vh",display:"flex",justifyContent:"center", alignItems:"center"}}>
            <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(evn) => {
              setEmail(evn.target.value);
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
            Assign
          </Button>
        </div>
      </Form>
        </main>
    )
}