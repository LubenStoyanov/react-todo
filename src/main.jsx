import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { appLoader, taskListLoader } from "./loaders";
// import { taskAction } from "./actions";
import "./index.css";
import TaskList from "./components/Tasklist/TaskList";

var router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
  },
  {
    path: "/:listName/:listId",
    element: <TaskList />,
    loader: taskListLoader,
    // action: taskAction,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
