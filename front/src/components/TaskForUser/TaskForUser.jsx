import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

export default function TaskForUser() {
  const { _id } = useParams();
  const getTask=useLoaderData();
  const [task,setTask]=useState(getTask)
  const handleStatus=async(status)=>{
    try {
        await axiosInstance.patch(`/api/tasks/user/${_id}`,{status:status});
        setTask({...task,status});
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <main
      style={{ fontSize: "18px",display:"flex" }}
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
            <>
            <span style={{
                fontSize:"16px",
                margin:"2vw",
            }}>{task?.status||""}</span>
            <p style={{marginTop:"2vh",fontSize:"14px"}}>If you want to update status, just choose from one below:</p>
            <div>
            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>handleStatus("Pending")}
            >
              Pending
            </Button>

            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>handleStatus("In Progress")}
            >
              In Progress
            </Button>
            
            <Button
              variant="outline-secondary"
              style={{ padding: "1vh 1.5vw" ,color:"#dfdfdf",marginRight:"2vw"}}
              onClick={()=>handleStatus("Completed")}
            >
              Completed
            </Button>
                </div>
            </>
        )}
      </p>
      <p>Deadline:</p>
      <p style={{fontSize:"16px",marginLeft:"2vw"}}>{task?.deadline.split("T")[0]||""}</p>
      <p>Assigned to:</p>
      <p style={{fontSize:"16px",marginLeft:"2vw"}}>
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
      <section style={{width:"50vw"}}>
      <p>Project:</p>
      <p style={{marginLeft:"2vw"}}>Title:</p>
      <p style={{fontSize:"16px",marginLeft:"4vw"}}>{task?.project.title||""}</p>
      <p style={{marginLeft:"2vw"}}>Manager:</p>
      <p style={{fontSize:"16px",marginLeft:"4vw"}}>{task?.project.manager.email||""}</p>
      <p style={{marginLeft:"2vw"}}>Deadline:</p>
      <p style={{fontSize:"16px",marginLeft:"4vw"}}>{task?.project.deadline.split("T")[0]||""}</p>
      </section>
    </main>
  );
}

export const loader = async (arg) => {
  const response=await axiosInstance.get(`/api/tasks/${arg.params._id}`);
  return response.data.data.task;
};
