import { createClient } from "@libsql/client";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./style.css";
import { useRef } from "react";

export default function Task({ id, title, dueDate, setForceRender }) {
  var dialogRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formTitle = formData.get("title");
    if (!formTitle) {
      dialogRef.current.close();
      return;
    }
    var formDueDate = formData.get("date");

    var client = createClient({
      url: import.meta.env.VITE_DB_URL,
      authToken: import.meta.env.VITE_DB_TOKEN,
    });

    try {
      await client.execute({
        sql: "UPDATE tasks SET title = (:title), dueDate = (:dueDate) WHERE id = (:id)",
        args: { id: id, title: formTitle, dueDate: formDueDate },
      });
    } catch (error) {
      console.error(error);
    }

    dialogRef.current.close();
    setForceRender((r) => !r);
  }

  async function deleteTask() {
    var client = createClient({
      url: import.meta.env.VITE_DB_URL,
      authToken: import.meta.env.VITE_DB_TOKEN,
    });

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
    <>
      <div className="task">
        <input type="radio" name={id} />
        <div className="task-info-wrapper">
          <div className="task-info">
            <h2>{title}</h2>
            <time>{dueDate}</time>
          </div>
          <div className="buttons-wrapper">
            <button onClick={() => dialogRef.current.showModal()}>
              <FaEdit />
            </button>
            <button onClick={() => deleteTask()} className="delete-btn">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <div>
        <dialog ref={dialogRef} className="add-task-modal">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder={title} />
            <label htmlFor="date">Time and Date</label>
            <input type="dateTime-local" name="date" id="date" />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => dialogRef.current.close()}>
              Close
            </button>
          </form>
        </dialog>
      </div>
    </>
  );
}
