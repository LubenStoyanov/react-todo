import { useEffect, useState } from "react";
import Task from "../Task/Task";
import { createClient } from "@libsql/client";

import "./style.css";

export default function TaskList({
  forceRender,
  setForceRender,
  setCompletionCount,
}) {
  var [tasks, setTasks] = useState([]);
  var [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    var client = createClient({
      url: import.meta.env.VITE_DB_URL,
      authToken: import.meta.env.VITE_DB_TOKEN,
    });

    async function fetchTasks() {
      var result = await client.execute("SELECT * FROM tasks;");
      setTasks(result.rows);
    }
    fetchTasks();
    setCompletedTasks(tasks.filter((task) => task.status == 1));
  }, [forceRender, tasks]);

  return (
    <>
      <div className="completion-info">
        <p>{completedTasks.length} done • delete</p>
      </div>
      <div className="task-list">
        {tasks
          .filter((task) => task.status == 0)
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              dueDate={task.dueDate.split("T").join(", ")}
              status={task.status}
              setForceRender={setForceRender}
              setCompletionCount={setCompletionCount}
            />
          ))}
        {completedTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            dueDate={task.dueDate.split("T").join(", ")}
            status={task.status}
            setForceRender={setForceRender}
            setCompletionCount={setCompletionCount}
          />
        ))}
      </div>
    </>
  );
}
