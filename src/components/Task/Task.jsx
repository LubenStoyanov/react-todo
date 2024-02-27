import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./style.css";
import Modal from "../Modal/Modal";
import { updateTask, updateTaskStatus, deleteTask } from "../../database";

export default function Task({ id, title, dueDate, status, setForceRender }) {
  var [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formTitle = formData.get("title") || title;

    var formDueDate = formData.get("date");
    updateTask(id, formTitle, formDueDate);

    setShowModal(false);
    setForceRender((r) => !r);
  }

  return (
    <>
      <div className="task">
        <input
          type="radio"
          name={id}
          onChange={(e) => {
            updateTaskStatus(id, status, e);
            setForceRender((r) => !r);
          }}
          checked={status}
        />
        <div className="task-info-wrapper">
          <div className="task-info">
            <h2>{title}</h2>
            <time>{dueDate}</time>
          </div>
          <div className="buttons-wrapper">
            <button onClick={() => setShowModal(true)}>
              <FaEdit />
            </button>
            <button
              onClick={() => {
                deleteTask(id);
                setForceRender((r) => !r);
              }}
              className="delete-btn"
            >
              <FaTrash />
            </button>
          </div>
        </div>
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
