import { ADMIN_INFO } from "../actions/types";

const INITIAL_STATE = {
  admin: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADMIN_INFO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
