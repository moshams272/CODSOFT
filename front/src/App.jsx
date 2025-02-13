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
