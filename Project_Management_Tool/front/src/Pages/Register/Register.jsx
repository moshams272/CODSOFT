import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axiosInstance from "../../AxiosConfig/AxiosConfig.js";
import { useState } from "react";
export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [colorOfRegister, setColorOfRegister] = useState(
    "rgb(226 223 223 / 80%)"
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      const response = await axiosInstance.post("/api/users/register", user);
      localStorage.setItem("token", response.data.data.user.token);
      navigate("/dashboard");
    } catch (err) {
      let error=err.response?.data.message||"";
      if(error.startsWith("User validation failed: ")){
        error=error.slice("User validation failed: ".length);
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
        height: "100vh",
        width: "100vw",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40vw",
          height: "80vh",
          padding: "10%",
          background:
            "linear-gradient(to left,rgb(2, 52, 48,0.3) 20%,rgb(2, 52, 48))",
            
        }}
      >
        <h2 style={{ marginBottom: "5vh" }}>Register</h2>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control
                placeholder="Enter first name"
                value={firstName}
                onChange={(evn) => setFirstName(evn.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Enter last name"
                value={lastName}
                onChange={(evn) => setLastName(evn.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(evn) => {
                setPassword(evn.target.value);
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
              Register
            </Button>
            <div style={{ marginTop: "1vh" }}>
              Already have an account?{" "}
              <Link
                to={"/login"}
                style={{ color: colorOfRegister }}
                onPointerEnter={() => setColorOfRegister("#dfdfdf")}
                onPointerLeave={() =>
                  setColorOfRegister("rgb(226 223 223 / 80%)")
                }
              >
                Login
              </Link>
            </div>
          </div>
        </Form>
      </section>
    </main>
  );
}
