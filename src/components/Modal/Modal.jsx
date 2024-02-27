import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./style.css";

export default function Modal({ children }) {
  var ref = useRef(null);
  if (!ref.current) {
    ref.current = document.createElement("div");
  }

  useEffect(() => {
    var modalRoot = document.getElementById("modal");
    modalRoot.appendChild(ref.current);
    return () => modalRoot.removeChild(ref.current);
  }, []);

  return createPortal(
    <div className="modalOverlay">
      <div className="modal">{children}</div>
    </div>,
    ref.current
  );
}
