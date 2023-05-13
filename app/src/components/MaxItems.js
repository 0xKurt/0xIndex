import { useContext } from "react";
import Context from "../other/Context";
import { Dropdown } from "react-bootstrap";

const MaxItems = () => {
 const { state, dispatch } = useContext(Context);
 const maxEntries = [
  6, 10, 25, 50, 100, 250 ]

 const handleEntries = (max) => {
  dispatch({
   type: "SET_MAX_ENTRIES",
   payload: max,
  });
 };

 return (
   <div className="d-flex flex-column align-items-start justify-content-center">
     <span style={{ marginLeft: "15px" }}>Max Items:</span>
     <Dropdown>
       <Dropdown.Toggle variant="dark" id="dropdown-basic">
         Select ({state.maxEntries})
       </Dropdown.Toggle>
       <Dropdown.Menu variant="dark">
         {maxEntries.map((max, index) => (
           <>
             <Dropdown.Item key={max} onClick={() => handleEntries(max)}>
               {max}
             </Dropdown.Item>
           </>
         ))}
       </Dropdown.Menu>
     </Dropdown>
   </div>
 );
}

export default MaxItems;