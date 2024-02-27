import { useEffect, useState } from "react";
import Task from "../Task/Task";
import { createClient } from "@libsql/client";

import "./style.css";

var client = createClient({
  url: import.meta.env.VITE_DB_URL,
  authToken: import.meta.env.VITE_DB_TOKEN,
});

export default function TaskList({ forceRender, setForceRender }) {
  var [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      var result = await client.execute("SELECT * FROM tasks;");
      setTasks(result.rows);
    }
    fetchTasks();
  }, [forceRender]);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          dueDate={task.dueDate.split("T").join(", ")}
          setForceRender={setForceRender}
        />
      ))}
    </div>
  );
}
