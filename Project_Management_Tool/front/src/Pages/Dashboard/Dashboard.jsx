import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import { useEffect, useState } from "react";

export default function Dashboard() {
  
    const [user, setUser] = useState({});
      const getUser=async()=>{
        try {
            const response=await axiosInstance.get("/api/users/");
            setUser(response.data.data.user)
        } catch (error) {
            console.log(error.message);
        }
      }

    useEffect(()=>{
        getUser();
      },[])
  return (
    <main>
      <Navbar
        style={{ cssText: "background-color:rgb(1, 39, 36) !important; margin-bottom:3vh" }}
        className="bg-body-tertiary"
      >
        <Container style={{ margin: "0 2vw" }}>
          <Navbar.Brand
            href="/dashboard"
            style={{
              color: "rgb(226 223 223 / 80%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{user.firstName+" "+user.lastName}</span>
            <span style={{ fontSize: "13px" }}>{user.email}</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse
            className="justify-content-end"
            style={{ fontSize: "20px" }}
          >
            <Navbar.Text style={{ marginRight: "1vw" }}>
              <Link to={"/dashboard/project/create"}>
                <MdOutlineCreateNewFolder
                  style={{ color: "rgb(226 223 223 / 80%)" }}
                />
              </Link>
            </Navbar.Text>

            <Navbar.Text style={{ marginRight: "1vw" }}>
              <Link to={"/dashboard/settings"}>
                <MdOutlineSettings
                  style={{ color: "rgb(226 223 223 / 80%)" }}
                />
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={"/login"}>
                <FaArrowRightToBracket
                  style={{ color: "rgb(226 223 223 / 80%)" }}
                  onClick={()=>{localStorage.removeItem("token")}}
                />
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section style={{marginLeft:"2vw",width:"97vw",height:"85vh"}}>
      <Outlet/>
      </section>
    </main>
  );
}


