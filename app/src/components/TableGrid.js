import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, ToastContainer } from "react-bootstrap";
import TableBody from "./TableBody";
import TableModal from "./TableModal";
import { stringToColor } from "../other/utils";
import { useParams, useHistory } from "react-router-dom/";
import { AiOutlineLink } from "react-icons/ai";
import Toast from "react-bootstrap/Toast";

function TableGrid({ data }) {
  const { chain, category } = useParams();
  const [toastMessage, setToastMessage] = useState("");
  const history = useHistory();

  const MAX_PROJECTS_PER_COLUMN = 6;
  const COLUMN_WIDTH = 350;
  const COLUMN_MARGIN = 20;

  // Calculate the number of rows needed to display all the tables
  const [numRows, setNumRows] = useState(0);

  useEffect(() => {
    const updateNumRows = () => {
      const newNumRows = Math.ceil(
        data.length /
          ((document.body.clientWidth + 20) / (COLUMN_WIDTH + COLUMN_MARGIN)),
      );
      setNumRows(newNumRows);
    };
    window.addEventListener("resize", updateNumRows);
    updateNumRows();
    return () => window.removeEventListener("resize", updateNumRows);
  }, [data]);

  // Create an array of table data grouped by rows and columns
  const tableData = Array(numRows)
    .fill()
    .map((_, rowIndex) =>
      data.slice(
        rowIndex *
          Math.floor(
            document.body.clientWidth / (COLUMN_WIDTH + COLUMN_MARGIN),
          ),
        (rowIndex + 1) *
          Math.floor(
            document.body.clientWidth / (COLUMN_WIDTH + COLUMN_MARGIN),
          ),
      ),
    );

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
    <Container fluid>
      {tableData.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          {row.map((col, colIndex) => (
            <>
              {category && category === col.shortName.toLowerCase() && (
                <TableModal
                  show={category === col.shortName.toLowerCase()}
                  onHide={() => history.push(`/${chain}`)}
                  data={col}
                />
              )}
              <Col
                key={colIndex}
                xs="auto"
                style={{
                  width: COLUMN_WIDTH,
                  marginRight: colIndex === row.length - 1 ? 0 : COLUMN_MARGIN,
                }}
              >
                <Table bordered hover bg="dark" variant="dark">
                  <thead>
                    <tr>
                      <th
                        style={{
                          backgroundColor: stringToColor(col.name),
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{col.name}</span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyLink(
                              window.location.href +
                                "/" +
                                col.shortName.toLowerCase(),
                            )
                          }
                        >
                          <AiOutlineLink
                            size={20}
                            style={{
                              marginLeft: "10px",
                              opacity: "0.75",
                            }}
                          />
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <>
                    <TableBody
                      projects={col.projects}
                      max={MAX_PROJECTS_PER_COLUMN}
                      expand={() =>
                        history.push(`/${chain}/${col.shortName.toLowerCase()}`)
                      }
                    />
                  </>
                </Table>
              </Col>
            </>
          ))}
        </Row>
      ))}
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
    </Container>
  );
}

export default TableGrid;
