import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  team: {
    name: "",
    id: null,
    loginStatus: false,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TEAM_INFO":
      return {
        ...state,
        team: {
          ...state.team,
          name: action.payload.name,
          id: action.payload.id,
          loginStatus: true,
        },
      };
    case "SET_LOG_OUT":
      return {
        ...state,
        team: {
          ...state.team,
          name: "",
          id: null,
          loginStatus: false,
        },
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer,
});

export default store;
