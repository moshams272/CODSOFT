import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [colorOfRegister,setColorOfRegister]=useState("rgb(226 223 223 / 80%)");
  const navigate = useNavigate();

  const handleToken=async()=>{
    const token=localStorage.getItem("token");
    if(!token)return;
    try {
      await axiosInstance.get("/api/users/",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      navigate("/dashboard");
    } catch {
      localStorage.removeItem("token");
    }
  }
  useEffect(()=>{
    handleToken();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email: email, password: password };
    try {
      const response = await axiosInstance.post("/api/users/login", user);
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      let error=err.response.data.message;
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
          width: "40%",
          height: "60%",
          padding: "10%",
          background:
            "linear-gradient(to left,rgb(2, 52, 48,0.3) 20%,rgb(2, 52, 48))",
        }}
      >
        <h2 style={{ marginBottom: "5vh" }}>Login</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
            {error && <div style={{ color: "red" ,textAlign:"center",marginBottom:"1vh"}}>{error}</div>}
            <Button
              variant="outline-secondary"
              type="submit"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf"}}
            >
              Login
            </Button>
            <div style={{ marginTop: "1vh" }}>
              Not member yet?{" "}
              <Link
                to={"/register"}
                style={{ color: colorOfRegister }}
                onPointerEnter={()=>setColorOfRegister("#dfdfdf")}
                onPointerLeave={()=>setColorOfRegister("rgb(226 223 223 / 80%)")}
              >
                Register
              </Link>
            </div>
          </div>
        </Form>
      </section>
    </main>
  );
}
