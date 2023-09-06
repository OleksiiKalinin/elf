import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { rootReducer } from ".";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const nextReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (state.general) nextState.general = state.general;
        if (state.etc) nextState.etc = state.etc;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export const nextStore = createWrapper(() => createStore(nextReducer, applyMiddleware(thunk)), { debug: true });