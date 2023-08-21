import { companyActionTypes } from "../../actions";
import { companyReducerAction } from "./types";


const addAdvert = (): companyReducerAction => ({
    type: companyActionTypes.ADD_COMPANY,
    payload: true
})

const removeAdvert = (): companyReducerAction => ({
    type: companyActionTypes.REMOVE_COMPANY,
    payload: true
})

const editAdvert = (): companyReducerAction => ({
    type: companyActionTypes.EDIT_COMPANY,
    payload: true
})


export default {
    addAdvert, removeAdvert, editAdvert
};