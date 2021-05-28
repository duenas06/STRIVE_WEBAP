import { createContext, useRef, useState } from "react";

const NavLoaderContext = createContext({
  isDoneLoading: false,
  handleLoadingState: () => {},
});

export function NavLoaderContextProvider(props) {
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  function handleLoadingState() {
    setIsDoneLoading(!isDoneLoading);
  }

  const context = {
    isDoneLoading: isDoneLoading,
    handleLoadingState: handleLoadingState,
  };

  return (
    <NavLoaderContext.Provider value={context}>
      {props.children}
    </NavLoaderContext.Provider>
  );
}

export default NavLoaderContext;
