import { useState } from "react";
import "./style.css";
import Modal from "../Modal/Modal";
import { useParams } from "react-router-dom";
import { createTask } from "../../actions";

export default function NewTask() {
  var { listId } = useParams();
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

    createTask(formName, formDueDate, listId);
    setShowModal(false);
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
