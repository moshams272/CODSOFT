import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function TasksAndProjects(){
    const {tasks,projects} = useLoaderData();
    const navigate=useNavigate();
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [currentPageProjects, setCurrentPageProjects] = useState(1);
  const [selectedProjects, setSelectedProjects] = useState([]);
  useEffect(() => {
    setSelectedTasks(
      tasks.slice((currentPageTasks - 1) * 3, (currentPageTasks - 1) * 3 + 3)
    );
  }, [currentPageTasks,tasks]);
  
  useEffect(() => {
    setSelectedProjects(
      projects.slice((currentPageProjects - 1) * 3, (currentPageProjects - 1) * 3 + 3)
    );
  }, [currentPageProjects,projects]);
  
    return(
        <>
        <section>
        <p style={{ fontSize: "20px" }}>Tasks:</p>
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {tasks.length > 0 ? (
            selectedTasks.map((item) => {
              return (
                <Card
                  key={item._id}
                  style={{
                    width: "20vw",
                    fontSize: "12px",
                    background: "rgb(226 223 223 / 80%)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title: {item.title}</Card.Title>
                    <Card.Text>Description: {item.description}</Card.Text>
                    <Card.Text>Status: {item.status}</Card.Text>
                    <Card.Text>
                      Deadline: {item.deadline.split("T")[0]}
                    </Card.Text>
                    <Button
                      variant="secondary"
                      style={{ padding: "1vh 1.5vw", color: "#dfdfdf" }}
                      onClick={()=>navigate(`/dashboard/task/${item._id}`)}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>You didn&#39;t have any tasks</div>
          )}
        </section>
        <section
          style={{
            marginTop: "2vh",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <Button
            variant="outline-secondary"
            style={{ padding: "1vh 1.5vw", color: "#dfdfdf" ,marginRight:"0.5vw"}}
            disabled={currentPageTasks === 1}
            onClick={() => setCurrentPageTasks(currentPageTasks - 1)}
          >
            Prev
          </Button>
          <span>
            Page {currentPageTasks} of {Math.max(Math.ceil(tasks.length / 3),1)}
          </span>
          <Button
            variant="outline-secondary"
            style={{ padding: "1vh 1.5vw", color: "#dfdfdf" ,marginLeft:"0.5vw"}}
            disabled={currentPageTasks === Math.max(Math.ceil(tasks.length / 3),1)}
            onClick={() => setCurrentPageTasks(currentPageTasks + 1)}
          >
            Next
          </Button>
        </section>
      </section>

      <section style={{ margin: "2vh 0 0 0" }}>
        <p style={{ fontSize: "20px" }}>Projects:</p>
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {projects.length > 0 ? (
            selectedProjects.map((item) => {
              return (
                <Card
                  key={item._id}
                  style={{
                    width: "20vw",
                    fontSize: "12px",
                    background: "rgb(226 223 223 / 80%)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title: {item.title}</Card.Title>
                    <Card.Text>Description: {item.description}</Card.Text>
                    <Card.Text>Status: {item.status}</Card.Text>
                    <Card.Text>
                      Deadline: {item.deadline.split("T")[0]}
                    </Card.Text>
                    <Button
                      variant="secondary"
                      style={{ padding: "1vh 1.5vw", color: "#dfdfdf" }}
                      onClick={()=>navigate(`/dashboard/project/${item._id}`)}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>You didn&#39;t have any projects</div>
          )}
        </section>
        <section
          style={{
            marginTop: "2vh",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
          }}
        >
          <Button
            variant="outline-secondary"
            style={{ padding: "1vh 1.5vw", color: "#dfdfdf" ,marginRight:"0.5vw"}}
            disabled={currentPageProjects === 1}
            onClick={() => setCurrentPageProjects(currentPageProjects - 1)}
          >
            Prev
          </Button>
          <span>
            Page {currentPageProjects} of {Math.max(Math.ceil(projects.length / 3),1)}
          </span>
          <Button
            variant="outline-secondary"
            style={{ padding: "1vh 1.5vw", color: "#dfdfdf" ,marginLeft:"0.5vw"}}
            disabled={currentPageProjects === Math.max(Math.ceil(projects.length / 3),1)}
            onClick={() => setCurrentPageProjects(currentPageProjects + 1)}
          >
            Next
          </Button>
        </section>
      </section>
        </>
    )
}

export const loader = async () => {
    const tasks = await axiosInstance.get("/api/tasks/user");
    const projects =await axiosInstance.get("/api/projects");
    return {tasks:tasks.data.data.tasks,projects:projects.data.data.projects};
  };