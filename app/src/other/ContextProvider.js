import React, { useReducer } from "react";
import Context from "./Context";
import { initialState, reducer } from "./Reducer";

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
