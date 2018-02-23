import { ADD_TODO, FETCH_TODOS, DELETE_TODO } from "../actions/types";
export default function(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state;
    case DELETE_TODO:
      return state;
    case FETCH_TODOS:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}
