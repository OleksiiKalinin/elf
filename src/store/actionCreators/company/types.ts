import { companyActionTypes } from "../../actions";

interface AddCompany {
    type: companyActionTypes.ADD_COMPANY,
    payload: any,
}

interface removeCompany {
    type: companyActionTypes.REMOVE_COMPANY,
    payload: any,
}
interface editCompany {
    type: companyActionTypes.EDIT_COMPANY,
    payload: any,
}


export type companyReducerAction = AddCompany | removeCompany | editCompany;