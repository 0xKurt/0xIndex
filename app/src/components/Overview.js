import { useContext, useEffect, useState } from "react";
import Context from "../other/Context";
import TableGrid from "./TableGrid";
import { useParams, useHistory } from "react-router-dom/";

import ChainHeader from "./ChainHeader";
import DownloadMap from "./DownloadMap";
import Sort from "./Sort";
import { stringToColor } from "../other/utils";
import MaxItems from "./MaxItems";
import SelectCategory from "./SelectCategory";
import { images } from "../fakeapi/data/blockchains";
import { getProjects } from "../fakeapi/api";

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
      const response =
        process.env.REACT_APP_FAKE_API === "true"
          ? ""
          : await fetch(
              `${process.env.REACT_APP_API}/blockchains/${state.network.id}/projects`,
            );
      const data =
        process.env.REACT_APP_FAKE_API === "true"
          ? getProjects(state.network.id)
          : await response.json();
      setCategories(data);
      dispatch({
        type: "SET_CATEGORIES",
        payload: data.map(({ name, shortName }) => ({ name, shortName })),
      });
    };
    if (state?.network?.id) init();
  }, [state?.network?.id]);

  const sendFeedback = async () => {
    window.open("https://twitter.com/_kurtme", "_blank");
  };

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
        <div
          id="ecosystem-overview"
          style={{ backgroundColor: "#222222", color: "#fff" }}
        >
          <div className="d-flex categorymenu">
            <ChainHeader network={state.network} />
            <div className="d-flex gap-2">
              <SelectCategory />
              <MaxItems />
              <Sort />
              <DownloadMap />
            </div>
          </div>
        </div>
        <div
          onClick={sendFeedback}
          className="text-end row3"
          style={{
            padding: "0 15px 10px 0",
            opacity: "0.5",
            cursor: "pointer",
          }}
        >
          Feedback? Get in touch!
        </div>
        {categories && categories.length > 0 && (
          <TableGrid data={sortByKey(state.sorting, categories)} />
        )}
      </div>
    </>
  );
};

export default Overview;
