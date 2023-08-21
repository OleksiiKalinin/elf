import { advertActionTypes } from "../../actions";
import { advertReducerAction } from "./types";


const addAdvert = (): advertReducerAction => ({
    type: advertActionTypes.ADD_ADVERT,
    payload: true
})

const removeAdvert = (): advertReducerAction => ({
    type: advertActionTypes.REMOVE_ADVERT,
    payload: true
})

const editAdvert = (): advertReducerAction => ({
    type: advertActionTypes.EDIT_ADVERT,
    payload: true
})


export default {
    addAdvert, removeAdvert, editAdvert
};