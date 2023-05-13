const initialState = {
  network: 1,
  sorting: "cat_asc",
  maxEntries: 6,
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NETWORK":
      return { ...state, network: action.payload };
    case "SET_AVAILABLE_NETWORKS":
      return { ...state, networks: action.payload };
    case "SET_SORTING":
      return { ...state, sorting: action.payload };
    case "SET_MAX_ENTRIES":
      return { ...state, maxEntries: action.payload }; 
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
