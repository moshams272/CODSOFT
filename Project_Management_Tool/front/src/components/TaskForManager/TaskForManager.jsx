import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/AxiosConfig";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function TaskForManager() {
  const { _idProject, _id } = useParams();
  const getTask = useLoaderData();
  const [task, setTask] = useState(getTask);
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const deleteTask = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async(result) => {
        if (result.isConfirmed) {
          try {
            await axiosInstance.delete(`/api/tasks/manager/${_id}`);
            navigate(`/dashboard/project/${_idProject}`);
          } catch (error) {
            console.log(error);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <main style={{ fontSize: "18px", display: "flex", height: "82vh" }}>
      <section style={{ width: "50vw" }}>
        <p style={{ fontSize: "19px", fontWeight: "bold" }}>
          {task?.title || ""}
        </p>
        <p>Description:</p>
        <p style={{ fontSize: "16px", marginLeft: "2vw" }}>
          {task?.description || ""}
        </p>
        <p>Status:</p>
        <p>
          {task?.status === "Deadline is over" ? (
            <span
              style={{
                fontSize: "16px",
                marginLeft: "2vw",
                color: "red",
              }}
            >
              {task?.status || ""}
            </span>
          ) : (
            <span
              style={{
                fontSize: "16px",
                margin: "2vw",
              }}
            >
              {task?.status || ""}
            </span>
          )}
        </p>
        <p>Deadline:</p>
        <p style={{ fontSize: "16px", marginLeft: "2vw" }}>
          {task?.deadline.split("T")[0] || ""}
        </p>
        <p>Assigned to:</p>
        <p
          style={{
            fontSize: "16px",
            marginLeft: "2vw",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {task?.assignedTo.length || 0 > 0 ? (
            task.assignedTo.map((user) => {
              return (
                <span key={user._id} style={{ marginRight: "3vw" }}>
                  {user.email}
                </span>
              );
            })
          ) : (
            <span>Not assigned to any one</span>
          )}
        </p>
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "50vw",
        }}
      >
        <Button
          variant="outline-secondary"
          style={{
            width: "10vw",
            height: "5.5vh",
            color: "#dfdfdf",
            margin: "8vh 0 3vh 0.5vw",
          }}
          onClick={() => {
            navigate(`/dashboard/project/${_idProject}/updateTask/${_id}`);
          }}
        >
          Update
        </Button>

        <Button
          variant="outline-secondary"
          style={{
            width: "10vw",
            height: "5.5vh",
            color: "#dfdfdf",
            margin: "0 0 3vh 0.5vw",
          }}
          onClick={() => {
            navigate(
              `/dashboard/project/${_idProject}/TaskAssignOrUnassign/${_id}/assign`
            );
          }}
        >
          Assign
        </Button>

        <Button
          variant="outline-secondary"
          style={{
            width: "10vw",
            height: "5.5vh",
            color: "#dfdfdf",
            margin: "0 0 3vh 0.5vw",
          }}
          onClick={() => {
            navigate(
              `/dashboard/project/${_idProject}/TaskAssignOrUnassign/${_id}/unassign`
            );
          }}
        >
          Unassign
        </Button>

        <Button
          variant="danger"
          style={{
            width: "10vw",
            height: "5.5vh",
            color: "#dfdfdf",
            margin: "0 0 3vh 0.5vw",
          }}
          onClick={() => {
            deleteTask();
          }}
        >
          Delete
        </Button>
      </section>
    </main>
  );
}

export const loader = async (arg) => {
  const response = await axiosInstance.get(`/api/tasks/${arg.params._id}`);
  return response.data.data.task;
};
