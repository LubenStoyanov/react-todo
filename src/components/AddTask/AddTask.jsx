import { useRef } from "react";
import "./style.css";

import { createClient } from "@libsql/client";

export default function AddTask({ setForceRender }) {
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
        sql: "INSERT INTO tasks (title, dueDate) VALUES (:title, :dueDate)",
        args: { title: formTitle, dueDate: formDueDate },
      });
    } catch (error) {
      console.error(error);
    }

    dialogRef.current.close();
    setForceRender((r) => !r);
  }

  return (
    <>
      <div className="add-task-button-container">
        <button
          onClick={() => dialogRef.current.showModal()}
          className="add-task-button"
        >
          <div className="add-sign-wrapper">
            <span className="add-sign">+</span>
          </div>
          <p>Add Task</p>
        </button>
      </div>
      <div>
        <dialog ref={dialogRef} className="add-task-modal">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
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
