// flux.js
import React, { useState, useEffect } from "react";

const initialState = {
  // Player Stats
  player: {
    name: "",
    level: 1,
    experience: 0,
    credits: 1000,
    inventory: [],
    equipment: {
      weapon: null,
      armor: null,
      artifact: null,
      gadget: null,
    },
    properties: [],
  },

  // Economy and Items
  economy: {
    contrabandItems: [],
    energyItems: [],
    artifactItems: [],
    elementalItems: [],
    phoenixItems: [],
    dragonItems: [],
  },

  // Game Progression and Achievements
  gameProgress: {
    quests: [],
    achievements: [],
  },

  // Exploration and Space Battles
  exploration: {
    currentLocation: "",
    spaceBattles: [],
    planetaryExploration: [],
  },

  // Events and Random Encounters
  events: {
    randomEvents: [],
  },
};

// Function to save the game state to local storage
const saveGameState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("gameState", serializedState);
  } catch (error) {
    console.error("Error saving game state:", error);
  }
};

// Function to load the game state from local storage
const loadGameState = () => {
  try {
    const serializedState = localStorage.getItem("gameState");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading game state:", error);
    return null;
  }
};

const getState = ({ getStore, getActions, setStore }) => {
  // Load the initial state from local storage, if available
  const initialStateFromStorage = loadGameState();

  return {
    store: initialStateFromStorage || initialState,
    actions: {
      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
         * fetch().then().then(data => setStore({ "foo": data.bar }))
         */
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
      },

      // Function to save the game state to local storage
      saveGameState: () => {
        const state = getStore();
        saveGameState(state);
      },

      // Function to load the game state from local storage
      loadGameState: () => {
        const state = loadGameState();
        if (state) {
          setStore(state);
        }
      },
    },
  };
};

export default getState;
export { initialState, saveGameState, loadGameState };
