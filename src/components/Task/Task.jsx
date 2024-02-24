import "./style.css";

export default function Task({ id, title, dueDate }) {
  return (
    <div className="task">
      <input type="radio" name={id} id="status" />
      <div className="task-info">
        <h2>{title}</h2>
        <time>{dueDate}</time>
      </div>
    </div>
  );
}
