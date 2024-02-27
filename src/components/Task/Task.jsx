import { createClient } from "@libsql/client";
import { FaTrash } from "react-icons/fa";
import "./style.css";

export default function Task({ id, title, dueDate, setForceRender }) {
  async function handleClick() {
    var client = createClient({
      url: import.meta.env.VITE_DB_URL,
      authToken: import.meta.env.VITE_DB_TOKEN,
    });
    console.log(id);

    try {
      await client.execute({
        sql: "DELETE FROM tasks WHERE id = (:id)",
        args: { id: id },
      });
      setForceRender((r) => !r);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="task">
      <input type="radio" name={id} />
      <div className="task-info-wrapper">
        <div className="task-info">
          <h2>{title}</h2>
          <time>{dueDate}</time>
        </div>
        <button onClick={() => handleClick()} className="delete-btn">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
