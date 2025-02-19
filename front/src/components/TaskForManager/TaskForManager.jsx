import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from 'react-bootstrap/Button';

export default function TaskForManager() {
    const { _idProject,_id } = useParams();
    const [task,setTask]=useState();
    const navigate=useNavigate();
    
    const deleteTask=async()=>{
      try {
        await axiosInstance.delete(`/api/tasks/manager/${_id}`);
        navigate(`/dashboard/project/${_idProject}`)
      } catch (error) {
       console.log(error);
      }
    }
    const getTask=async()=>{
      try {
          const response=await axiosInstance.get(`/api/tasks/${_id}`);
          setTask(response.data.data.task);
      } catch (error) {
          console.log(error);
      }
    }
    useEffect(()=>{
      getTask();
    },[]);
    return (
      <main
        style={{ fontSize: "18px",display:"flex" ,height:"82vh"}}
      >
          <section style={{width:"50vw"}}>
        <p style={{fontSize:"19px",fontWeight:"bold"}}>{task?.title||""}</p>
        <p>Description:</p>
        <p style={{fontSize:"16px",marginLeft:"2vw"}}>{task?.description||""}</p>
        <p>Status:</p>
        <p>
          {task?.status==="Deadline is over"?
          (
              <span style={{
                  fontSize:"16px",
                  marginLeft:"2vw",
                  color:"red"
              }}>{task?.status||""}</span>
          ):(
              <span style={{
                  fontSize:"16px",
                  margin:"2vw",
              }}>{task?.status||""}</span>
              
          )}
        </p>
        <p>Deadline:</p>
        <p style={{fontSize:"16px",marginLeft:"2vw"}}>{task?.deadline.split("T")[0]||""}</p>
        <p>Assigned to:</p>
        <p style={{fontSize:"16px",marginLeft:"2vw", display:"flex",flexWrap:"wrap"}}>
        {task?.assignedTo.length||0>0?(
          task.assignedTo.map((user)=>{
              return(
                  <span key={user._id} style={{marginRight:"3vw"}}>
                      {user.email}
                  </span>
              );
          })
        ):(
        <span>
          Not assigned to any one
        </span>
      )}
        </p>
        </section>
        <section style={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:"50vw"}}>

        <Button
            variant="secondary"
            style={{
             width:"10vw",
             height:"5.5vh",
             color: "#dfdfdf",
              margin: "8vh 0 3vh 0.5vw",
            }}
            onClick={() => {navigate(`/dashboard/project/${_idProject}/updateTask/${_id}`)}}
          >
            Update
          </Button>

          <Button
            variant="secondary"
            style={{
              width:"10vw",
              height:"5.5vh",
              color: "#dfdfdf",
              margin: "0 0 3vh 0.5vw",
            }}
            onClick={() => {navigate(`/dashboard/project/${_idProject}/assignTask/${_id}`)}}
          >
            Assign
          </Button>

          <Button
            variant="secondary"
            style={{
              width:"10vw",
              height:"5.5vh",
              color: "#dfdfdf",
              margin: "0 0 3vh 0.5vw",
            }}
            onClick={() => {navigate(`/dashboard/project/${_idProject}/unassignTask/${_id}`)}}
          >
            Unassign
          </Button>

          <Button
            variant="danger"
            style={{
              width:"10vw",
              height:"5.5vh",
              color: "#dfdfdf",
              margin: "0 0 3vh 0.5vw",
            }}
            onClick={() => {deleteTask()}}
          >
            Delete
          </Button>
        </section>
      </main>
    )
}
