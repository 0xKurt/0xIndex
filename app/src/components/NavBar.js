import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext, useEffect } from "react";
import Context from "../other/Context";
import { TbSunMoon } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import Brand from "./Brand";

function NavBar() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const onDropdownHandler = (network) => {
    history.push(`/${network.name.toLowerCase()}`);
  };

  const onInit = (networks) => {
    dispatch({
      type: "SET_AVAILABLE_NETWORKS",
      payload: networks.sort((a, b) => a.id - b.id),
    });
  };

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`${process.env.REACT_APP_API}/blockchains`);
      const nw = await response.json();
      onInit(nw);
    };
    init();
  }, []);

  const toggleLightMode = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
        <Navbar.Brand
          onClick={() => history.push("/")}
          style={{ cursor: "pointer" }}
        >
          <Brand />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={state?.network?.name || ""}
            drop="start"
            menuVariant="dark"
            className="text-light"
            style={{ textTransform: "capitalize" }}
          >
            {state.networks &&
              state.networks.map((network) => (
                <NavDropdown.Item
                  key={Math.random()}
                  // href="#action/3.1"
                  style={{ textTransform: "capitalize" }}
                  onClick={() => onDropdownHandler(network)}
                >
                  {network.name}
                </NavDropdown.Item>
              ))}{" "}
          </NavDropdown>
          <button
            className="btn btn-link text-light"
            onClick={toggleLightMode}
            style={{
              position: "relative",
              top: "-3px",
              marginLeft: "10px",
              fontSize: "20px",
              color: "grey",
              textDecoration: "none",
            }}
          >
            <TbSunMoon />
          </button>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;
