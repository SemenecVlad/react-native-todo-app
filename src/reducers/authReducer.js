import { AUTH_SUCCESS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { token: action.payload };
    default:
      return state;
  }
}
