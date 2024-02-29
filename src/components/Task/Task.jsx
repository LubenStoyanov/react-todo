import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { deleteTask, updateTask, updateTaskStatus } from "../../actions";
import "./style.css";

export default function Task({ id, name, dueDate, status, listId }) {
  var [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formTitle = formData.get("name") || name;

    var formDueDate = formData.get("date");
    updateTask(listId, id, formTitle, formDueDate);

    setShowModal(false);
  }

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          name={id}
          onChange={() => {
            updateTaskStatus(listId, id, status);
          }}
          checked={status}
        />
        <div className="task-info-wrapper">
          <div className="task-info">
            <h2>{name}</h2>
            <time>{dueDate}</time>
          </div>
          <div className="buttons-wrapper">
            <button onClick={() => setShowModal(true)}>
              <FaEdit />
            </button>
            <button
              onClick={() => {
                deleteTask(listId, id);
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
