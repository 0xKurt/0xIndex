import { useContext, useEffect, useState } from "react";
import Context from "../other/Context";
import TableGrid from "./TableGrid";
import { useParams, useHistory } from "react-router-dom/";

import ChainHeader from "./ChainHeader";
import DownloadMap from "./DownloadMap";

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

  //

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <ChainHeader network={state.network} />
          <DownloadMap />
        </div>
        {categories && categories.length > 0 && <TableGrid data={categories} />}
      </div>
    </>
  );
};

export default Overview;
