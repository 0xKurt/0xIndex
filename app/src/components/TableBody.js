import Context from "../other/Context";
import Project from "./Project";
import { useContext } from "react";

const TableBody = ({ projects, expand, maxOverride }) => {
  const {state, dispatch} = useContext(Context);
  const max = maxOverride ? maxOverride : state.maxEntries;

  return (
    <>
      <tbody>
        {projects
          .sort((a, b) => b.rating - a.rating)
          .slice(0, max)
          .map((p) => (
            <Project key={p.id} project={p} />
          ))}
        {projects.length > max && (
          <tr className="justify-content-end">
            <td>
              <div
                variant="link"
                style={{ color: "grey", cursor: "pointer", textAlign: "right" }}
                onClick={expand}
              >
                {`View more (${projects.length - max})`}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default TableBody;
