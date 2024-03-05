import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import TaskList from "./components/Tasklist/TaskList";
import { QueryClient, QueryClientProvider } from "react-query";

var queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

var router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:listName/:listId",
    element: <TaskList />,
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
