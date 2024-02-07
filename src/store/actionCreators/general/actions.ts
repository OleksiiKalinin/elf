import { SwipeablePanelProps } from "../../../components/organismes/SwipeablePanel";
import { CurrentScreenType } from "../../../hooks/withUrl";
import { generalActionTypes } from "../../actions";
import { AppDataType, BlockedScreenType, CandidateMarkType, CandidateNotesType, CandidatesFiltersType, CompanyDataType, InvoiceType, JobIndustryType,ShowUserShouldBeLogedInModalType, SnackbarMessageType, UserAdvertType, UserDataType, UserEventType, UserQuestionsType, UserSettingsType, WindowSizesType } from "../../reducers/types";
import { generalReducerAction } from "./types";

const setToken = (payload: {token: string | null, refresh_token: string | null}): generalReducerAction => ({
    type: generalActionTypes.SET_TOKEN,
    payload
})

const setWindowSizes = (payload: WindowSizesType): generalReducerAction => ({
    type: generalActionTypes.SET_WINDOW_SIZES,
    payload
})

const setShowUserShouldBeLogedInModal = (payload: ShowUserShouldBeLogedInModalType): generalReducerAction => ({
    type: generalActionTypes.SET_SHOW_USER_SHOULD_BE_LOGED_IN_MODAL,
    payload
})

const setShowUserShouldHaveCompanyModal = (payload: ShowUserShouldBeLogedInModalType): generalReducerAction => ({
    type: generalActionTypes.SET_SHOW_USER_SHOULD_HAVE_COMPANY_MODAL,
    payload
})

const setShowExitWarningModal = (payload: boolean): generalReducerAction => ({
    type: generalActionTypes.SET_SHOW_EXIT_WARNING_MODAL,
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

const setUserSettings = (payload: UserSettingsType | null): generalReducerAction => ({
    type: generalActionTypes.SET_USER_SETTINGS,
    payload
})

const setJobIndustries = (payload: JobIndustryType[]): generalReducerAction => ({
    type: generalActionTypes.SET_JOB_INDUSTRIES,
    payload
})

const setSwipeablePanelProps = (payload: SwipeablePanelProps | null): generalReducerAction => ({
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

const setCurrentScreen = (payload: CurrentScreenType): generalReducerAction => ({
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

const setUserQuestions = (payload: UserQuestionsType[]): generalReducerAction => ({
    type: generalActionTypes.SET_USER_QUESTIONS,
    payload
})

const setCandidatesFilters = (payload: CandidatesFiltersType | null): generalReducerAction => ({
    type: generalActionTypes.SET_CANDIDATES_FILTERS,
    payload
})

const resetStore = (): generalReducerAction => ({
    type: generalActionTypes.RESET_STORE
});

const setSnackbarMessage = (payload: SnackbarMessageType | null): generalReducerAction => ({
    type: generalActionTypes.SET_SNACKBAR_MESSAGE,
    payload
});

const setBlockedScreen= (payload: BlockedScreenType): generalReducerAction => ({
    type: generalActionTypes.SET_BLOCKED_SCREEN,
    payload
});

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
    setWindowSizes,
    setUserQuestions,
    setCandidatesFilters,
    resetStore,
    setSnackbarMessage,
    setUserSettings,
    setShowUserShouldBeLogedInModal,
    setShowUserShouldHaveCompanyModal,
    setShowExitWarningModal,
    setBlockedScreen
};

export default generalActions;