import { calendarActionTypes } from "../../actions";

interface addEvent {
    type: calendarActionTypes.ADD_EVENT,
    payload: any,
}

interface removeEvent {
    type: calendarActionTypes.REMOVE_EVENT,
    payload: any,
}
interface editEvent {
    type: calendarActionTypes.EDIT_EVENT,
    payload: any,
}

interface SaveQuestions {
    type: calendarActionTypes.SAVE_QUESTIONS,
    payload: any,
}

export type calendarReducerAction = addEvent | removeEvent | editEvent | SaveQuestions;