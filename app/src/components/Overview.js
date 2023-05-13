import { useContext, useEffect, useState } from "react";
import Context from "../other/Context";
import TableGrid from "./TableGrid";
import { useParams, useHistory } from "react-router-dom/";

import ChainHeader from "./ChainHeader";
import DownloadMap from "./DownloadMap";
import Sort from "./Sort";
import { stringToColor } from "../other/utils";
import MaxItems from "./MaxItems";

const Overview = () => {
  const { state, dispatch } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const { chain } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (state.networks?.length > 0) {
      const selectedNetwork = state.networks.find(
        (n) => n.name.toLowerCase() === chain,
      );
      if (!selectedNetwork)
        history.push(`/${state.networks[0].name.toLowerCase()}`);
      dispatch({
        type: "SET_NETWORK",
        payload: selectedNetwork,
      });
    }
  }, [state.networks, chain]);

  useEffect(() => {
    const init = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API}/blockchains/${state.network.id}/projects`,
      );
      const data = await response.json();
      setCategories(data);
    };
    if (state?.network?.id) init();
  }, [state?.network?.id]);

  function sortByKey(sorting, data) {
    switch (sorting) {
      case "cat_asc":
        return data.sort((a, b) => a.name.localeCompare(b.name));
      case "cat_desc":
        return data.sort((a, b) => b.name.localeCompare(a.name));
      case "entries_asc":
        return data.sort((a, b) => a.projects.length - b.projects.length);
      case "entries_desc":
        return data.sort((a, b) => b.projects.length - a.projects.length);
      case "color_asc":
        return data.sort((a, b) =>
          stringToColor(a.name).localeCompare(stringToColor(b.name)),
        );
      case "color_desc":
        return data.sort((a, b) =>
          stringToColor(b.name).localeCompare(stringToColor(a.name)),
        );
      default:
        return data;
    }
  }

  return (
    <>
      <div
        id="ecosystem-overview"
        style={{
          backgroundColor: "#222222",
          color: "#fff",
        }}
      >
        <div className="d-flex justify-content-between">
          <ChainHeader network={state.network} />
          <div className="d-flex gap-2">
            <MaxItems />
            <Sort />
            <DownloadMap />
          </div>
        </div>
        {categories && categories.length > 0 && (
          <TableGrid data={sortByKey(state.sorting, categories)} />
        )}
      </div>
    </>
  );
};

export default Overview;
