import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function AppLayout() {
  const loader = useSelector((state) => state.loader.loader);
  return (
    <>
      {loader?(
        <div
          style={{
            position:"fixed",
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            width: "100vw",
            height: "100vh",
            background: "rgba(11, 101, 93, 0.89)",
            zIndex:"100",
            backdropFilter:"blur(2px)"
          }}
        >
          <Spinner animation="grow" style={{background:"rgb(2, 52, 48,0.3)"}} />
        </div>
      ):<></>}
      <Outlet />
    </>
  );
}
