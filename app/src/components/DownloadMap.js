import { MdFileDownload } from "react-icons/md";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import Toasty from "./Toasty";
import { useState } from "react";

const DownloadMap = () => {
  const { chain, category } = useParams();
  const [toastMessage, setToastMessage] = useState("");

  const timeNow = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const downloadMap = async () => {
    console.log("download map");
    htmlToImage
      .toPng(document.getElementById("ecosystem-overview"))
      .then(function (dataUrl) {
        setToastMessage("Download started.");
        download(dataUrl, `./ecosystem-${chain}-${timeNow}.png`);
      })
      .catch(function (error) {
        setToastMessage("Download failed!");
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{ padding: "40px", opacity: "0.15" }}
      >
        <div
          className="d-flex align-items-center justify-content-center mb-3"
          title="Download Map"
          style={{
            border: "3px solid white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={() => {
            setToastMessage("Prepare download...");
            downloadMap();
          }}
        >
          <MdFileDownload size={32} />
        </div>
      </div>
      <Toasty message={toastMessage} />
    </>
  );
};

export default DownloadMap;
