import { SwipeablePanelProps } from "../../../components/organismes/SwipeablePanel";
import { CurrentScreenType } from "../../../hooks/withUrl";
import { generalActionTypes } from "../../actions";
import { AppDataType, BlockedScreenType, CandidateMarkType, CandidateNotesType, CandidatesFiltersType, CompanyDataType, InvoiceType, JobExperienceType, JobIndustryType, JobSalaryModeType, JobSalaryTaxType, MarkDataType, NoteDataType, ShowDraftFormModalType, ShowUserShouldBeLogedInModalType, SnackbarMessageType, UserAdvertType, UserDataType, UserEventType, UserQuestionsType, UserSettingsType, WindowSizesType } from "../../reducers/types";

interface setToken {
    type: generalActionTypes.SET_TOKEN,
    payload: {token: string | null, refresh_token: string | null},
}

interface setWindowSizes {
    type: generalActionTypes.SET_WINDOW_SIZES,
    payload: WindowSizesType
}

interface setShowUserShouldBeLogedInModal {
    type: generalActionTypes.SET_SHOW_USER_SHOULD_BE_LOGED_IN_MODAL,
    payload: ShowUserShouldBeLogedInModalType
}

interface setShowUserShouldHaveCompanyModal {
    type: generalActionTypes.SET_SHOW_USER_SHOULD_HAVE_COMPANY_MODAL,
    payload: ShowUserShouldBeLogedInModalType
}

interface setShowExitWarningModal {
    type: generalActionTypes.SET_SHOW_EXIT_WARNING_MODAL,
    payload: boolean,
}

interface setUserData {
    type: generalActionTypes.SET_USER_DATA,
    payload: UserDataType
}

interface setCandidateMarks {
    type: generalActionTypes.SET_CANDIDATE_MARKS,
    payload: CandidateMarkType[]
}

interface setCandidateNotes {
    type: generalActionTypes.SET_CANDIDATE_NOTES,
    payload: CandidateNotesType[]
}

interface setUserAdverts {
    type: generalActionTypes.SET_USER_ADVERTS,
    payload: UserAdvertType[]
}

interface setUserEvents {
    type: generalActionTypes.SET_USER_EVENTS,
    payload: UserEventType[]
}

interface setUserInvoices {
    type: generalActionTypes.SET_USER_INVOICES,
    payload: InvoiceType[]
}

interface setUserCompany {
    type: generalActionTypes.SET_USER_COMPANY,
    payload: CompanyDataType | null
}

interface setUserSettings {
    type: generalActionTypes.SET_USER_SETTINGS,
    payload: UserSettingsType | null
}

interface setIsTabbarVisible {
    type: generalActionTypes.SET_IS_TABBAR_VISIBLE,
    payload: boolean,
}

interface setJobIndustries {
    type: generalActionTypes.SET_JOB_INDUSTRIES,
    payload: JobIndustryType[],
}

interface setAppLoading {
    type: generalActionTypes.SET_APP_LOADING,
    payload: boolean,
}

interface setSwipeablePanelProps {
    type: generalActionTypes.SET_SWIPEABLE_PANEL_PROPS,
    payload: SwipeablePanelProps | null,
}

interface setIsMainMenuFlatList {
    type: generalActionTypes.SET_IS_MAIN_MENU_FLAT_LIST,
    payload: boolean,
}

interface setProfileHelpScreenDisplayed {
    type: generalActionTypes.SET_PROFILE_HELP_SCREEN_DISPLAYED,
    payload: boolean,
}

interface setCurrentScreen {
    type: generalActionTypes.SET_CURRENT_SCREEN,
    payload: CurrentScreenType,
}

interface setAppData {
    type: generalActionTypes.SET_APP_DATA,
    payload: AppDataType,
}

interface LogOut {
    type: generalActionTypes.LOG_OUT,
}

interface setUserQuestions {
    type: generalActionTypes.SET_USER_QUESTIONS,
    payload: UserQuestionsType[],
}

interface setCandidatesFilters {
    type: generalActionTypes.SET_CANDIDATES_FILTERS,
    payload: CandidatesFiltersType | null,
}

interface resetStore {
    type: generalActionTypes.RESET_STORE
}

interface setSnackbarMessage {
    type: generalActionTypes.SET_SNACKBAR_MESSAGE,
    payload: SnackbarMessageType | null,
}

interface setBlockedScreen {
    type: generalActionTypes.SET_BLOCKED_SCREEN,
    payload: BlockedScreenType,
}

interface setShowDraftFormModal {
    type: generalActionTypes.SET_SHOW_DRAFT_FORM_MODAL,
    payload: ShowDraftFormModalType | null,
}

export type generalReducerAction = 
    setToken |
    setIsTabbarVisible |
    setCurrentScreen |
    setProfileHelpScreenDisplayed |
    setIsMainMenuFlatList |
    setAppLoading |
    setSwipeablePanelProps |
    setAppData |
    LogOut |
    setJobIndustries |
    setUserData |
    setUserCompany |
    setUserAdverts |
    setUserEvents | 
    setUserSettings |
    setCandidateMarks |
    setCandidateNotes |
    setUserInvoices |
    setWindowSizes |
    setUserQuestions |
    setCandidatesFilters |
    resetStore |
    setSnackbarMessage |
    setShowUserShouldBeLogedInModal |
    setShowUserShouldHaveCompanyModal |
    setShowExitWarningModal |
    setBlockedScreen |
    setShowDraftFormModal