import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

const Toasty = ({ message }) => {
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 1500);
  }, [message]);

  return (
    <ToastContainer
      className="p-3"
      position={"top-center"}
      style={{ zIndex: 1, width: "250px", opacity: "0.9" }}
    >
      <Toast show={toastMessage !== ""} bg="secondary">
        <Toast.Body
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {toastMessage}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toasty;
