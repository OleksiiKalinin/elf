import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { generalReducer } from "./reducers/generalReducer";
import { TypedUseSelectorHook } from "react-redux";

export const rootReducer = combineReducers({
    general: generalReducer,
});

export const nativeStore = createStore(rootReducer, applyMiddleware(thunk));

export type rootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<rootState, void, AnyAction>;
export type AppSelector = TypedUseSelectorHook<rootState>;