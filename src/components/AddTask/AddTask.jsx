import { useState } from "react";
import "./style.css";

import { createClient } from "@libsql/client";
import Modal from "../Modal/Modal";

export default function AddTask({ setForceRender }) {
  var [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formTitle = formData.get("title");
    if (!formTitle) {
      setShowModal(false);
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

    setShowModal(false);
    setForceRender((r) => !r);
  }

  return (
    <>
      <div className="add-task-button-container">
        <button onClick={() => setShowModal(true)} className="add-task-button">
          <div className="add-sign-wrapper">
            <span className="add-sign">+</span>
          </div>
          <p>Add Task</p>
        </button>
      </div>
      {showModal ? (
        <Modal>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
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
