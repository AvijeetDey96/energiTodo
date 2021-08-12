import { combineReducers } from "redux";
import todoReducer from "./todo/todo.reducer";
const appReducer = combineReducers({
  todo: todoReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_ALL") {
    return appReducer(undefined, action)
  }

  return appReducer(state, action);
};
export default rootReducer;
