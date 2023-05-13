import Brand from "./Brand";
import { AiOutlineLink } from "react-icons/ai";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";
import { useState } from "react";

const ChainHeader = ({network}) => {
   const [toastMessage, setToastMessage] = useState("");

  function handleCopyLink(link) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setToastMessage("Link copied to clipboard!");
        setTimeout(() => {
          setToastMessage("");
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        setToastMessage("Failed to copy link!");
        setTimeout(() => {
          setToastMessage("");
        }, 1500);
      });
  }

  return (
    <div className="d-flex align-items-center mb-3" style={{ padding: "40px" }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "lightgrey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "10px",
        }}
      >
        <img
          src={
            process.env.REACT_APP_API +
            "/data/blockchains/" +
            network?.image
          }
          alt={network?.name}
          width="72"
          height="72"
        />
      </div>
      <div style={{ marginLeft: "20px", opacity: "0.9" }}>
        <h1 className="m-0">
          {network?.name}{" "}
          <AiOutlineLink
            onClick={() => handleCopyLink(window.location.href)}
            size={20}
            style={{
              opacity: "0.75",
              cursor: "pointer",
            }}
          />
        </h1>
        <span style={{ fontSize: "20px" }}>
          <Brand />
        </span>
      </div>
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
    </div>
  );
};

export default ChainHeader;
