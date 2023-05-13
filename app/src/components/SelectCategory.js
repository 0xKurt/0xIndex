import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import Context from "../other/Context";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const SelectCategory = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const { chain } = useParams();

  return (
    <div className="d-flex flex-column align-items-start justify-content-center">
      <span style={{ marginLeft: "15px" }}>Category:</span>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Select
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {state.categories.map((cat, index) => (
            <>
              <Dropdown.Item
                key={cat.name}
                onClick={() =>
                  history.push(`/${chain}/${cat.shortName.toLowerCase()}`)
                }
              >
                {cat.name}
              </Dropdown.Item>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectCategory;
