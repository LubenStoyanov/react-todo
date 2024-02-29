import Task from "../Task/Task";
import NewTask from "../NewTask/NewTask";

import "./style.css";
import { useLoaderData } from "react-router-dom";

export default function TaskList({ name, setCompletionCount }) {
  var rows = useLoaderData();

  return (
    <>
      <header className="header">
        <h1>{name}</h1>
      </header>
      <main>
        <div className="completion-info">
          <p>
            {rows.length} done •{" "}
            {/* <span role="button" onClick={deleteCompletedTasks}> */}
            delete
            {/* </span> */}
          </p>
        </div>
        <div className="task-list">
          <ul>
            {rows
              .filter((task) => task.status == 0)
              .map((task) => (
                <li key={task.task_id}>
                  <Task
                    id={task.task_id}
                    name={task.name}
                    dueDate={task.due_date.split("T").join(", ")}
                    status={task.status}
                    listId={task.task_list_id}
                    setCompletionCount={setCompletionCount}
                  />
                </li>
              ))}
            {rows
              .filter((task) => task.status == 1)
              .map((task) => (
                <li key={task.task_id}>
                  <Task
                    id={task.task_id}
                    name={task.name}
                    dueDate={task.due_date.split("T").join(", ")}
                    status={task.status}
                    listId={task.task_list_id}
                    setCompletionCount={setCompletionCount}
                  />
                </li>
              ))}
          </ul>
        </div>
      </main>
      <footer>
        <NewTask />
      </footer>
    </>
  );
}
