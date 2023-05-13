import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import Context from "../other/Context";

const Sort = () => {
  const { state, dispatch } = useContext(Context);

  //sorted object array array with sort strings and human readable names
  const sortOptions = [
    { sort: "cat_asc", name: <>&#9650;&nbsp;Categories A-Z</> },
    { sort: "cat_desc", name: <>&#9660;&nbsp;Categories Z-A</> },
    { sort: "entries_asc", name: <>&#9650;&nbsp;Entries 0-9</> },
    { sort: "entries_desc", name: <>&#9660;&nbsp;Entries 9-0</> },
    { sort: "color_asc", name: <>&#9650;&nbsp;Color 00-ff</> },
    { sort: "color_desc", name: <>&#9660;&nbsp;Color ff-00</> },
  ];

  const handleSort = (sort) => {
    dispatch({
      type: "SET_SORTING",
      payload: sort,
    });
  };

  return (
    <div className="d-flex flex-column align-items-start justify-content-center">
      <span style={{marginLeft: "15px"}}>Sort by:</span>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {sortOptions.find((o) => o.sort === state.sorting).name}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {sortOptions.map((option, index) => (
            <>
              <Dropdown.Item
                key={option.sort}
                onClick={() => handleSort(option.sort)}
              >
                {option.name}
              </Dropdown.Item>
              {index % 2 !== 0 && <Dropdown.Divider />}
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Sort;
