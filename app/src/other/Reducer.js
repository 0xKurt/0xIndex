const initialState = {
  network: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NETWORK":
      return { ...state, network: action.payload };
    case "SET_AVAILABLE_NETWORKS":
      return { ...state, networks: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
