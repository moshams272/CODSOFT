import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";

export default function Landing() {
  const navigate=useNavigate();
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
  return (
    <main
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <section>
          <img
            src="/FavIcon.png"
            alt="Project Management Tool Icon"
            width={"250vw"}
            height={"250vh"}
          />
        </section>
        <section
          style={{
            fontSize: "1.2rem",
            width: "55vw",
          }}
        >
          <h2 style={{fontWeight:"bold"}}>Project Management Tool</h2>
          <p>
            Take control of your projects like never before with Project
            Management Tool, a powerful and intuitive project management tool
            designed to help teams collaborate efficiently, stay organized, and
            meet deadlines with ease.
          </p>
          <Button variant="secondary" style={{color:"rgb(226 223 223)"}} onClick={()=>navigate("/login")}>Get Started</Button>
        </section>
    </main>
  );
}
