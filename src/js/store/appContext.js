import React, { useState, useEffect } from "react";
import getState, {
  initialState,
  saveGameState,
  loadGameState,
} from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      // Load the game state from local storage when the component mounts
      const initialStateFromStorage = loadGameState();
      if (initialStateFromStorage) {
        setState(initialStateFromStorage);
      }

      /**
       * EDIT THIS!
       * This function is the equivalent of "window.onLoad", it only runs once on the entire application lifetime.
       * You should do your ajax requests or fetch API requests here. Do not use setState() to save data in the
       * store, instead use actions, like this:
       *
       * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
       *
       **/

      // Save the game state to local storage whenever it changes
      saveGameState(state);

      // Clean up the effect to avoid memory leaks
      return () => {
        saveGameState(state);
      };
    }, [state]);

    // The initial value for the context is not null anymore, but the current state of this component,
    // the context will now have getStore, getActions, and setStore functions available because they were declared
    // on the state of this component
    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export default injectContext;
