import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { generalReducer } from "./reducers/generalReducer";

const rootReducer = combineReducers({
    general: generalReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));