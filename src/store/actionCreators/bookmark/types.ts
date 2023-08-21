import { bookmarkActionTypes } from "../../actions";

interface setSuper {
    type: bookmarkActionTypes.SET_SUPER,
    payload: any,
}

interface setConsider {
    type: bookmarkActionTypes.SET_CONSIDER,
    payload: any,
}

interface setFuture {
    type: bookmarkActionTypes.SET_FUTURE,
    payload: any,
}

interface setHistory {
    type: bookmarkActionTypes.SET_HISTORY,
    payload: any,
}

interface setBlank {
    type: bookmarkActionTypes.SET_BLANK,
    payload: any,
}

interface setColor {
    type: bookmarkActionTypes.SET_COLOR,
    payload: any,
}

export type bookmarkReducerAction = setSuper | setConsider | setFuture | setHistory | setBlank | setColor;