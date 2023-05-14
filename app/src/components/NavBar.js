import { Container, Dropdown } from "react-bootstrap";
import { useContext, useEffect } from "react";
import Context from "../other/Context";
import { TbSunMoon } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import Brand from "./Brand";
import { getBlockchains } from "../fakeapi/api";

function NavBar() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const onDropdownHandler = (network) => {
    history.push(`/${network.name.toLowerCase()}`);
  };

  const networks = state.networks
    ? [...state.networks].sort((a, b) => a.name.localeCompare(b.name))
    : undefined;

  const onInit = (networks) => {
    dispatch({
      type: "SET_AVAILABLE_NETWORKS",
      payload: networks.sort((a, b) => a.id - b.id),
    });
  };

  useEffect(() => {
    const init = async () => {
      const response = process.env.REACT_APP_FAKE_API === "true" ? "" : await fetch(`${process.env.REACT_APP_API}/blockchains`);
      const nw = process.env.REACT_APP_FAKE_API === "true" ? getBlockchains() : await response.json();
      console.log(nw)
      onInit(nw);
    };
    init();
  }, []);

  const toggleLightMode = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#1e1e1e",
          zIndex: 1,
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <Brand
              size="1.5em"
              onClick={() => history.push("/")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Dropdown
              menuVariant="dark"
              style={{ textTransform: "capitalize", marginRight: "10px" }}
            >
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {state?.network?.name || ""}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                {networks &&
                  networks.map((network) => (
                    <Dropdown.Item
                      key={Math.random()}
                      style={{ textTransform: "capitalize" }}
                      onClick={() => onDropdownHandler(network)}
                    >
                      {network.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
            <button
              className="btn btn-link text-light"
              onClick={toggleLightMode}
              style={{
                position: "relative",
                top: "-3px",
                fontSize: "20px",
                color: "grey",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <TbSunMoon />
            </button>
          </div>
        </div>
      </div>
  );
}

export default NavBar;
