import { useState } from "react";
import Toasty from "./Toasty";
import { AiOutlineLink } from "react-icons/ai";

const CopyLink = ({ size, link }) => {
  const [toastMessage, setToastMessage] = useState("");

  function handleCopyLink(link) {
    setToastMessage("");
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setToastMessage("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        setToastMessage("Failed to copy link!");
      });
  }
  return (
    <>
      <span style={{ cursor: "pointer" }} onClick={() => handleCopyLink(link)}>
        <AiOutlineLink
          size={size || 20}
          style={{
            marginLeft: "10px",
            opacity: "0.75",
          }}
        />
      </span>
      <Toasty message={toastMessage} />
    </>
  );
};

export default CopyLink;
