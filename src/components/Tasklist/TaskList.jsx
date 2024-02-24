import Task from "../Task/Task";
import "./style.css";

export default function TaskList() {
  return (
    <div className="task-list">
      <Task
        id={1}
        title="dishes"
        status={{ done: false }}
        dueDate={"05.02.24, 14:00"}
      />
      <Task
        id={2}
        title="dishes"
        status={{ done: false }}
        dueDate={"05.02.24, 14:00"}
      />
      <Task
        id={3}
        title="dishes"
        status={{ done: false }}
        dueDate={"05.02.24, 14:00"}
      />
    </div>
  );
}
