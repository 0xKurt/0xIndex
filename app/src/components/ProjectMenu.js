import { Dropdown } from "react-bootstrap";

const ProjectMenu = (
  { show }, // TODO: Add closeMenu to props
) => {
  return (
    <Dropdown>
      <Dropdown.Menu show={show} variant="dark" as="dropdown" drop="start" className="dropleft">
        <Dropdown.Item eventKey="1">Report Dead Link</Dropdown.Item>
        <Dropdown.Item eventKey="2">Report Scam</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Update/Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProjectMenu;
