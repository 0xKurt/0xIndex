const initialState = {
  network: 1,
  sorting: "cat_asc",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NETWORK":
      return { ...state, network: action.payload };
    case "SET_AVAILABLE_NETWORKS":
      return { ...state, networks: action.payload };
    case "SET_SORTING":
      return { ...state, sorting: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
