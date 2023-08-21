import { calendarActionTypes } from "../../actions";
import { calendarReducerAction } from "./types";

const addEvent = (): calendarReducerAction => ({
    type: calendarActionTypes.ADD_EVENT,
    payload: true
})

const removeEvent = (): calendarReducerAction => ({
    type: calendarActionTypes.REMOVE_EVENT,
    payload: true
})

const editEvent = (): calendarReducerAction => ({
    type: calendarActionTypes.EDIT_EVENT,
    payload: true
})

const saveQuestions = (): calendarReducerAction => ({
    type: calendarActionTypes.SAVE_QUESTIONS,
    payload: true
})

export default {
    addEvent, removeEvent, saveQuestions, editEvent
};