import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { generalReducer } from "./reducers/generalReducer";

export const rootReducer = combineReducers({
    general: generalReducer,
});

export const nativeStore = createStore(rootReducer, applyMiddleware(thunk));

export type rootState = ReturnType<typeof rootReducer>;
export type NextThunkDispatch = ThunkDispatch<rootState, void, AnyAction>;