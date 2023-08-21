import { bookmarkActionTypes } from "../../actions";
import { bookmarkReducerAction } from "./types";

const setSuper = (): bookmarkReducerAction => ({
    type: bookmarkActionTypes.SET_SUPER,
    payload: true
})

const setConsider = (): bookmarkReducerAction => ({
    type: bookmarkActionTypes.SET_CONSIDER,
    payload: true
})

const setFuture = (): bookmarkReducerAction => ({
    type: bookmarkActionTypes.SET_FUTURE,
    payload: true
})

const setHistory = (): bookmarkReducerAction => ({
    type: bookmarkActionTypes.SET_HISTORY,
    payload: true
})

const setColor = (): bookmarkReducerAction => ({
    type: bookmarkActionTypes.SET_COLOR,
    payload: true
})

export default {
    setSuper,
    setConsider,
    setFuture,
    setHistory,
    setColor
};