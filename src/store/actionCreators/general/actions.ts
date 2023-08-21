import { SwipeablePanelNoControlProps } from "../../../components/organismes/SwipeablePanel";
import { generalActionTypes } from "../../actions";
import { CandidateMarkType, CandidateNotesType, CompanyDataType, InvoiceType, JobIndustryType, UserAdvertType, UserDataType, UserEventType } from "../../reducers/types";
import { AppDataType, generalReducerAction } from "./types";

const setToken = (payload: {token: string | null, refresh_token: string | null}): generalReducerAction => ({
    type: generalActionTypes.SET_TOKEN,
    payload
})

const setIsTabbarVisible = (payload: boolean): generalReducerAction => ({
    type: generalActionTypes.SET_IS_TABBAR_VISIBLE,
    payload
})

const setUserData = (payload: UserDataType): generalReducerAction => ({
    type: generalActionTypes.SET_USER_DATA,
    payload
})

const setUserAdverts = (payload: UserAdvertType[]): generalReducerAction => ({
    type: generalActionTypes.SET_USER_ADVERTS,
    payload
})

const setCandidateMarks = (payload: CandidateMarkType[]): generalReducerAction => ({
    type: generalActionTypes.SET_CANDIDATE_MARKS,
    payload
})

const setCandidateNotes = (payload: CandidateNotesType[]): generalReducerAction => ({
    type: generalActionTypes.SET_CANDIDATE_NOTES,
    payload
})

const setUserEvents = (payload: UserEventType[]): generalReducerAction => ({
    type: generalActionTypes.SET_USER_EVENTS,
    payload
})

const setUserInvoices = (payload: InvoiceType[]): generalReducerAction => ({
    type: generalActionTypes.SET_USER_INVOICES,
    payload
})

const setUserCompany = (payload: CompanyDataType | null): generalReducerAction => ({
    type: generalActionTypes.SET_USER_COMPANY,
    payload
})

const setJobIndustries = (payload: JobIndustryType[]): generalReducerAction => ({
    type: generalActionTypes.SET_JOB_INDUSTRIES,
    payload
})

const setSwipeablePanelProps = (payload: SwipeablePanelNoControlProps | null): generalReducerAction => ({
    type: generalActionTypes.SET_SWIPEABLE_PANEL_PROPS,
    payload
})

const setAppLoading = (payload: boolean): generalReducerAction => ({
    type: generalActionTypes.SET_APP_LOADING,
    payload
})

const setIsMainMenuFlatList = (payload: boolean): generalReducerAction => ({
    type: generalActionTypes.SET_IS_MAIN_MENU_FLAT_LIST,
    payload
})

const setProfileHelpScreenDisplayed = (payload: boolean): generalReducerAction => ({
    type: generalActionTypes.SET_PROFILE_HELP_SCREEN_DISPLAYED,
    payload
})

const setCurrentScreen = (payload: string): generalReducerAction => ({
    type: generalActionTypes.SET_CURRENT_SCREEN,
    payload
})

const setAppData = (payload: AppDataType): generalReducerAction => ({
    type: generalActionTypes.SET_APP_DATA,
    payload
})

const LogOut = (): generalReducerAction => ({
    type: generalActionTypes.LOG_OUT,
})

const generalActions = {
    setToken,
    setIsTabbarVisible,
    setCurrentScreen,
    setProfileHelpScreenDisplayed,
    setIsMainMenuFlatList,
    setAppLoading,
    setSwipeablePanelProps,
    setAppData,
    LogOut,
    setJobIndustries,
    setUserData,
    setUserCompany,
    setUserAdverts,
    setUserEvents,
    setCandidateMarks,
    setCandidateNotes,
    setUserInvoices,
};

export default generalActions;