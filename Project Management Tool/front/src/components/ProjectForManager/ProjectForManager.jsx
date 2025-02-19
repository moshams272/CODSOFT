import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import { useLoaderData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProjectsForManager() {
  const { _id } = useParams();
  const getProjectAndItsTasks=useLoaderData();
  const [project, setProject] = useState(getProjectAndItsTasks.project);
  const [tasks, setTasks] = useState(getProjectAndItsTasks.tasks);
  const navigate = useNavigate();
  const [currentPageTasks, setCurrentPageTasks] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState([]);


  const deleteProject=async(_id)=>{
    try {
      await axiosInstance.delete(`/api/projects/${_id}`);
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setSelectedTasks(
      tasks.slice((currentPageTasks - 1) * 3, (currentPageTasks - 1) * 3 + 3)
    );
  }, [currentPageTasks,tasks]);
  return (
    <main style={{ fontSize: "18px", display: "flex" , flexWrap:"wrap"}}>
      <section style={{ width: "47vw" ,height:"50vh"}}>
        <p style={{ fontSize: "19px", fontWeight: "bold" }}>
          {project?.title || ""}
        </p>
        <p>Description:</p>
        <p style={{ fontSize: "16px", marginLeft: "2vw" }}>
          {project?.description || ""}
        </p>
        <p>Status:</p>
        <p
          style={{
            fontSize: "16px",
            marginLeft: "2vw",
            color:
              (project?.status || "") === "Deadline is over"
                ? "red"
                : " rgb(226 223 223 / 80%) ",
          }}
        >
          {project?.status || ""}
        </p>
        <p>Deadline:</p>
        <p style={{ fontSize: "16px", marginLeft: "2vw" }}>
          {project?.deadline.split("T")[0] || ""}
        </p>
      </section>

      <section style={{height:"50vh"}}>
        <p style={{ fontSize: "20px" }}>Tasks:</p>
        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
            width:"50vw"
          }}
        >
          {tasks?.length || 0 > 0 ? (
            selectedTasks.map((item) => {
              return (
                <Card
                  key={item._id}
                  style={{
                    width: "15vw",
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
                      onClick={() => navigate(`/dashboard/project/${_id}/task/${item._id}`)}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>It didn&#39;t have any tasks</div>
          )}
        </section>
        <section
          style={{
            marginTop: "2vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outline-secondary"
            style={{
              padding: "1vh 1.5vw",
              color: "#dfdfdf",
              marginRight: "0.5vw",
            }}
            disabled={currentPageTasks === 1}
            onClick={() => setCurrentPageTasks(currentPageTasks - 1)}
          >
            Prev
          </Button>
          <span>
            Page {currentPageTasks} of{" "}
            {Math.max(Math.ceil(tasks.length / 3), 1)}
          </span>
          <Button
            variant="outline-secondary"
            style={{
              padding: "1vh 1.5vw",
              color: "#dfdfdf",
              marginLeft: "0.5vw",
            }}
            disabled={
              currentPageTasks === Math.max(Math.ceil(tasks.length / 3), 1)
            }
            onClick={() => setCurrentPageTasks(currentPageTasks + 1)}
          >
            Next
          </Button>
        </section>
      </section>
      <footer style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100vw"
      }}>
        <div style={{marginBottom:"1vh"}}>
        <Button
            variant="outline-secondary"
            style={{
              padding: "1vh 1.5vw",
              color: "#dfdfdf",
              marginLeft: "0.5vw",
            }}
            onClick={() => {navigate(`/dashboard/project/update/${_id}`)}}
          >
            Update
          </Button>
          <Button
            variant="danger"
            style={{
              padding: "1vh 1.5vw",
              color: "#dfdfdf",
              marginLeft: "0.5vw",
            }}
            onClick={()=>{deleteProject(_id)}}
          >
            Delete
          </Button>
        </div>
        <div>
        <Button
            variant="outline-secondary"
            style={{
              padding: "1vh 3.7vw",
              color: "#dfdfdf",
              marginLeft: "0.5vw",
            }}
            onClick={()=>{navigate(`/dashboard/project/createTask/${_id}`)}}
          >
            Create Task
          </Button>
        </div>
      </footer>
    </main>
  );
}

export const loader = async (arg) => {
  const tasks = await axiosInstance.get(`/api/tasks/manager/all/${arg.params._id}`);
  const project = await axiosInstance.get(`/api/projects/${arg.params._id}`)
  return {tasks:tasks.data.data.tasks,project:project.data.data.project};
};