import "./style.css";

export default function AddTask() {
  return (
    <div className="add-task-button-container">
      <button className="add-task-button">
        <div className="add-sign-wrapper">
          <span className="add-sign">+</span>
        </div>
        <p>Add Task</p>
      </button>
    </div>
  );
}
