import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./Pages/Landing/Landing.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import AppLayout from "./Pages/AppLayout/AppLayout.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TasksAndProjects, {
  loader as tasksAndProjectsLoader,
} from "./components/TasksAndProjects/TasksAndProjects.jsx";
import Settings from "./components/Settings/Settings.jsx";
import TaskForUser from "./components/TaskForUser/TaskForUser.jsx";
import ProjectsForManager from "./components/ProjectsForManager/ProjectsForManager.jsx";
import ProjectUpdate, { loader as loaderProjectUpdate } from "./components/ProjectUpdate/ProjectUpdate.jsx";
import ProjectCreate from "./components/ProjectCreate/ProjectCreate.jsx";
import CreateTask from "./components/CreateTask/CreateTask.jsx";
import TaskForManager from "./components/TaskForManager/TaskForManager.jsx";
import TaskUpdate, { loader as loaderTaskUpdate } from "./components/TaskUpdate/TaskUpdate.jsx";
import TaskAssignOrUnassign from "./components/TaskAssignOrUnassign/TaskAssignOrUnassign.jsx";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <TasksAndProjects />,
            loader: tasksAndProjectsLoader,
            errorElement: <NotFound />,
          },
          {
            path:"/dashboard/settings",
            element:<Settings/>
          },
          {
            path:"/dashboard/task/:_id",
            element:<TaskForUser/>,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/:_id",
            element:<ProjectsForManager/>,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/update/:_id",
            element:<ProjectUpdate/>,loader:loaderProjectUpdate,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/create",
            element:<ProjectCreate/>,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/createTask/:_id",
            element:<CreateTask/>,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/:_idProject/task/:_id",
            element:<TaskForManager/>,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/:_idProject/updateTask/:_id",
            element:<TaskUpdate/>,loader:loaderTaskUpdate,errorElement:<NotFound/>
          },
          {
            path:"/dashboard/project/:_idProject/TaskAssignOrUnassign/:_id/:assignOrUnassign",
            element:<TaskAssignOrUnassign/>,errorElement:<NotFound/>
          }
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
