import { advertActionTypes } from "../../actions";

interface addAdvert {
    type: advertActionTypes.ADD_ADVERT,
    payload: any,
}

interface removeAdvert {
    type: advertActionTypes.REMOVE_ADVERT,
    payload: any,
}
interface editAdvert {
    type: advertActionTypes.EDIT_ADVERT,
    payload: any,
}


export type advertReducerAction = addAdvert | removeAdvert | editAdvert;