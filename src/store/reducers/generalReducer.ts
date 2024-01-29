/// import { LoginManager } from "react-native-fbsdk-next";
import { Dimensions } from "react-native";
import { generalReducerAction } from "../actionCreators/general/types";
import { generalActionTypes } from "../actions";
import { generalReducerState } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { googleSignOut } from "../../components/organismes/GoogleSignin";
import { facebookSignOut } from "../../components/organismes/FacebookSignin";

const initialState: generalReducerState = {
    isTabbarVisible: true,
    isMainMenuFlatList: false,
    theme: 'light',
    // currentScreen: 'MenuStack-MainScreen',
    currentScreen: { stack: "MenuStack", screen: 'MainScreen' },
    token: null,
    refresh_token: null,
    swipeablePanelProps: null,
    profileHelpScreenDisplayed: false,
    jobModes: [],
    jobStartFrom: [],
    jobIndustries: [],
    jobTrials: [],
    jobTrialTimes: [],
    jobContractTypes: [],
    jobSalaryModes: [],
    jobSalaryTaxes: [],
    jobExperiences: [],
    languages: [],
    services: [],
    employeesAmount: [],
    appLoading: true,
    userData: null,
    userCompany: null,
    userAdverts: [],
    userEvents: [],
    userSettings: {
        notifications: [],
        cookies: [],
    },
    candidateNotes: [],
    candidateMarks: [],
    marksData: [],
    notesData: [],
    userInvoices: [],
    windowSizes: Dimensions.get('window'),
    userQuestions: [],
    candidatesFilters: null,
    snackbarMessage: null,
    showUserShouldBeLogedInModal: {
        state: false,
        closeAction: 'close'
    },
}

export const generalReducer = (state = initialState, action: generalReducerAction): generalReducerState => {
    switch (action.type) {
        case generalActionTypes.SET_TOKEN:
            const { token, refresh_token } = action.payload;
            if (token && refresh_token) AsyncStorage.multiSet([['token', token], ['refresh_token', refresh_token]]);
            else AsyncStorage.multiRemove(['token', 'refresh_token']);

            return { ...state, token, refresh_token };
        case generalActionTypes.SET_APP_DATA:
            return { ...state, ...action.payload, appLoading: false };
        case generalActionTypes.SET_WINDOW_SIZES:
            return { ...state, windowSizes: action.payload };
        case generalActionTypes.SET_CANDIDATE_MARKS:
            return { ...state, candidateMarks: action.payload };
        case generalActionTypes.SET_CANDIDATE_NOTES:
            return { ...state, candidateNotes: action.payload };
        case generalActionTypes.SET_JOB_INDUSTRIES:
            return { ...state, jobIndustries: action.payload };
        case generalActionTypes.SET_USER_ADVERTS:
            return { ...state, userAdverts: action.payload };
        case generalActionTypes.SET_USER_EVENTS:
            return { ...state, userEvents: action.payload };
        case generalActionTypes.SET_USER_INVOICES:
            return { ...state, userInvoices: action.payload };
        case generalActionTypes.SET_USER_DATA:
            return { ...state, userData: action.payload };
        case generalActionTypes.SET_USER_COMPANY:
            return { ...state, userCompany: action.payload };
        case generalActionTypes.SET_IS_TABBAR_VISIBLE:
            return { ...state, isTabbarVisible: action.payload };
        case generalActionTypes.SET_APP_LOADING:
            return { ...state, appLoading: action.payload };
        case generalActionTypes.SET_SNACKBAR_MESSAGE:
            return { ...state, snackbarMessage: action.payload };
        case generalActionTypes.SET_SHOW_USER_SHOULD_BE_LOGED_IN_MODAL:
            return { ...state, showUserShouldBeLogedInModal: action.payload };
        case generalActionTypes.SET_IS_MAIN_MENU_FLAT_LIST:
            AsyncStorage.setItem('isMainMenuFlatList', Number(action.payload).toString());
            return { ...state, isMainMenuFlatList: action.payload };
        case generalActionTypes.SET_PROFILE_HELP_SCREEN_DISPLAYED:
            return { ...state, profileHelpScreenDisplayed: action.payload };
        case generalActionTypes.SET_CURRENT_SCREEN:
            return { ...state, currentScreen: action.payload };
        case generalActionTypes.SET_SWIPEABLE_PANEL_PROPS:
            return { ...state, swipeablePanelProps: action.payload };
        case generalActionTypes.SET_USER_QUESTIONS:
            return { ...state, userQuestions: action.payload };
        case generalActionTypes.SET_CANDIDATES_FILTERS:
            return { ...state, candidatesFilters: action.payload };
        case generalActionTypes.SET_CANDIDATES_FILTERS:
            return { ...state, candidatesFilters: action.payload };
        case generalActionTypes.SET_USER_SETTINGS:
            if (action.payload) {
                if (action.payload.notifications) {
                    AsyncStorage.setItem('notifications', JSON.stringify(action.payload.notifications));
                };
                if (action.payload.cookies) {
                    AsyncStorage.setItem('cookies', JSON.stringify(action.payload.cookies));
                };
            }
            return { ...state, userSettings: action.payload };
        case generalActionTypes.LOG_OUT:
            AsyncStorage.multiRemove(['token', 'refresh_token']);
            googleSignOut();
            facebookSignOut();

            return {
                ...initialState,
                token: null,
                refresh_token: null,
                userData: null,
                userCompany: null,
                userAdverts: [],
                userEvents: [],
                appLoading: false
            };
        default: return state;
    }
}