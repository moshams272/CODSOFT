import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [mes,setMes]=useState("");
  const navigate=useNavigate();
  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      setUser(response.data.data.user);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch("/api/users/", user);
      setMes("Updated Successfully");
      setTimeout(()=>navigate(0),1000);
    } catch (err) {
      let error = err.response.data.message;
      if (error.startsWith("User validation failed: ")) {
        error = error.slice("User validation failed: ".length);
      }
      setError(error);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Form
        style={{width:"30%",height:"50%"}}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Row>
        <Form.Group  as={Col} className="mb-3" controlId="formBasicforFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={user.firstName}
            onChange={(e) => {
              setUser({ ...user, firstName: e.target.value });
              setError("");
              setMes("");
            }}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formBasicforLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={user.lastName}
            onChange={(e) => {
              setUser({ ...user, lastName: e.target.value });
              setError("");
              setMes("");
            }}
          />
        </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            disabled
            style={{ color: "GrayText" }}
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
        {mes &&(
            <div
            style={{
              color: "rgb(76 210 112)",
              textAlign: "center",
              marginBottom: "1vh",
            }}
          >
            {mes}
          </div>
        )
        }
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
