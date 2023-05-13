import { Modal, Table } from "react-bootstrap";
import { stringToColor } from "../other/utils";
import TableBody from "./TableBody";

const TableModal = ({ show, onHide, data }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="bg-dark pd-0"
      style={{ backgroundColor: "#212529", color: "white" }}
    >
      <Modal.Body style={{ backgroundColor: "#212529", border: "none" }}>
        <Table bordered hover bg="dark" variant="dark" className="pd-0">
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: stringToColor(data.name),
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{data.name}</span>
                <span style={{ cursor: "pointer" }} onClick={onHide}>
                  &nbsp; X &nbsp;
                </span>
              </th>
            </tr>
          </thead>
          <>
            <TableBody projects={data.projects} maxOverride={data.projects.length} />
          </>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default TableModal;
