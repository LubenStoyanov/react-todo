import { useState } from "react";
import Modal from "../Modal/Modal";
import "./style.css";
import { createList } from "../../actions";

export default function NewList() {
  var [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var formName = formData.get("name");
    if (!formName) {
      setShowModal(false);
      return;
    }

    createList(formName);
    setShowModal(false);
  }

  return (
    <>
      <div className="add-task-button-container">
        <button onClick={() => setShowModal(true)} className="add-task-button">
          <div className="add-sign-wrapper">
            <span className="add-sign">+</span>
          </div>
          <p>New List</p>
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
