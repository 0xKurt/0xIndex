import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import TableBody from "./TableBody";
import TableModal from "./TableModal";
import { stringToColor } from "../other/utils";
import { useParams, useHistory } from "react-router-dom/";
import CopyLink from "./CopyLink";

function TableGrid({ data }) {
  const { chain, category } = useParams();
  const history = useHistory();

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

  return (
    <Container fluid className="tablecontainer">
      {tableData.map((row, rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          {row.map((col, colIndex) => (
            <>
              <Col
                className="tablecolumn"
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
                        <CopyLink
                          link={
                            window.location.href +
                            "/" +
                            col.shortName.toLowerCase()
                          }
                        />
                      </th>
                    </tr>
                  </thead>
                  <>
                    <TableBody
                      projects={col.projects}
                      expand={() =>
                        history.push(`/${chain}/${col.shortName.toLowerCase()}`)
                      }
                    />
                  </>
                </Table>
              </Col>
              {category && category === col.shortName.toLowerCase() && (
                <TableModal
                  show={category === col.shortName.toLowerCase()}
                  onHide={() => history.push(`/${chain}`)}
                  data={col}
                />
              )}
            </>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default TableGrid;
