import { useParams, Link } from "react-router-dom";
import Task from "../Task/Task";
import NewTask from "../NewTask/NewTask";
import { FaChevronLeft } from "react-icons/fa6";
import "./style.css";
import { useQuery } from "react-query";
import { taskListLoader } from "../../loaders";

export default function TaskList() {
  var { listName } = useParams();
  var query = useQuery({
    queryKey: ["tasks", listName],
    queryFn: taskListLoader,
  });

  if (query.isLoading) {
    return <h1>...isLoading</h1>;
  }

  var completedTasks = query.data.filter((task) => task.status == 1);
  return (
    <>
      <header className="list-header">
        <Link to="/">
          <button>
            <div className="header-btn-wrapper">
              <FaChevronLeft /> <p>lists</p>
            </div>
          </button>
        </Link>
        <h1>{listName}</h1>
      </header>
      <main className="list-main">
        <div className="completion-info">
          <p>
            {completedTasks.length} done •{" "}
            {/* <span role="button" onClick={deleteCompletedTasks}> */}
            delete
            {/* </span> */}
          </p>
        </div>
        <div className="task-list-wrapper">
          <ul>
            {query.data
              .filter((task) => task.status == 0)
              .map((task) => (
                <li key={task.task_id}>
                  <Task
                    id={task.task_id}
                    name={task.name}
                    dueDate={task.due_date.split("T").join(", ")}
                    status={task.status}
                    listId={task.task_list_id}
                  />
                </li>
              ))}
            {completedTasks.map((task) => (
              <li key={task.task_id}>
                <Task
                  id={task.task_id}
                  name={task.name}
                  dueDate={task.due_date.split("T").join(", ")}
                  status={task.status}
                  listId={task.task_list_id}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="list-footer">
        <NewTask />
      </footer>
    </>
  );
}
