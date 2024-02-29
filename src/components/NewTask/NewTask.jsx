import { useState } from "react";
import "./style.css";

import { createClient } from "@libsql/client";
import Modal from "../Modal/Modal";
import { useParams } from "react-router-dom";

export default function NewTask({ setIsUpdated }) {
  var { listName } = useParams();
  var [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formName = formData.get("name");
    if (!formName) {
      setShowModal(false);
      return;
    }
    var formDueDate = formData.get("date");

    var client = createClient({
      url: import.meta.env.VITE_DB_URL,
      authToken: import.meta.env.VITE_DB_TOKEN,
    });

    try {
      var { rows } = await client.execute({
        sql: "SELECT * FROM task_lists WHERE name = (:name);",
        args: { name: listName.charAt(0).toUpperCase() + listName.slice(1) },
      });

      await client.execute({
        sql: "INSERT INTO tasks (name, due_date, task_list_id) VALUES (:name, :due_date, :task_list_id)",
        args: {
          name: formName,
          due_date: formDueDate,
          task_list_id: rows[0].task_list_id,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
    setIsUpdated((prev) => !prev);
    console.log("hi");
  }

  return (
    <>
      <div className="add-task-button-container">
        <button onClick={() => setShowModal(true)} className="add-task-button">
          <div className="add-sign-wrapper">
            <span className="add-sign">+</span>
          </div>
          <p>New Task</p>
        </button>
      </div>
      {showModal ? (
        <Modal>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              autoFocus
            />
            <label htmlFor="date"></label>
            <input type="dateTime-local" name="date" id="date" />
            <div className="form-btns-wrapper">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
