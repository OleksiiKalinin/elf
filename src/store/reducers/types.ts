import { SwipeablePanelProps } from "../../components/organismes/SwipeablePanel";
import { ScaledSize } from 'react-native';
import { NonNullableKeys, PartialBy } from "../../hooks/types";
import { CurrentScreenType, WithUrlProps } from "../../hooks/withUrl";

export interface generalReducerState {
    isTabbarVisible: boolean,
    windowSizes: WindowSizesType,
    theme: string,
    // currentScreen: string,
    currentScreen: CurrentScreenType,
    token: string | null,
    refresh_token: string | null,
    profileHelpScreenDisplayed: boolean,
    isMainMenuFlatList: boolean,
    appLoading: boolean,
    swipeablePanelProps: SwipeablePanelProps | null,
    userData: UserDataType | null,
    jobIndustries: JobIndustryType[],
    jobModes: JobModeType[],
    jobTrials: JobTrialType[],
    jobContractTypes: JobContractType[],
    jobTrialTimes: JobTrialTimesType[],
    jobStartFrom: JobStartFromType[],
    jobSalaryModes: JobSalaryModeType[],
    jobSalaryTaxes: JobSalaryTaxType[],
    jobExperiences: JobExperienceType[],
    languages: LanguageType[],
    services: ServiceType[],
    employeesAmount: EmployeesAmountType[],
    userCompany: CompanyDataType | null,
    userAdverts: UserAdvertType[],
    userEvents: UserEventType[],
    userSettings: UserSettingsType | null,
    candidateNotes: CandidateNotesType[],
    candidateMarks: CandidateMarkType[],
    marksData: MarkDataType[],
    notesData: NoteDataType[],
    userInvoices: InvoiceType[],
    userQuestions: UserQuestionsType[],
    candidatesFilters: CandidatesFiltersType | null,
    snackbarMessage: SnackbarMessageType | null,
    showUserShouldBeLogedInModal: ShowUserShouldBeLogedInModalType,
}

export type ShowUserShouldBeLogedInModalType = {
    state: boolean,
    closeAction: 'close' | 'redirectToRoot'
};

export type WindowSizesType = ScaledSize;

export type AppDataType = {
    userData: generalReducerState['userData'],
    userCompany: generalReducerState['userCompany'],
    jobIndustries: generalReducerState['jobIndustries'],
    jobModes: generalReducerState['jobModes'],
    jobContractTypes: generalReducerState['jobContractTypes'],
    jobStartFrom: generalReducerState['jobStartFrom'],
    jobTrials: generalReducerState['jobTrials'],
    jobTrialTimes: generalReducerState['jobTrialTimes'],
    jobSalaryModes: generalReducerState['jobSalaryModes'],
    jobSalaryTaxes: generalReducerState['jobSalaryTaxes'],
    jobExperiences: generalReducerState['jobExperiences'],
    languages: generalReducerState['languages'],
    employeesAmount: generalReducerState['employeesAmount'],
    services: generalReducerState['services'],
    userEvents: generalReducerState['userEvents'],
    marksData: generalReducerState['marksData'],
    notesData: generalReducerState['notesData'],
    userQuestions: generalReducerState['userQuestions'],
    candidatesFilters: generalReducerState['candidatesFilters'],
    appLoading: generalReducerState['appLoading'],
};

export interface InvoiceType {
    id: number,
    email: string,
    nip: string,
    payment_code: string,
    company_invoice_details: {
        dane: string,
        Regon: string,
        Nip: string,
        StatusNip: string | null,
        Nazwa: string,
        Wojewodztwo: string,
        Powiat: string,
        Gmina: string,
        Miejscowosc: string,
        KodPocztowy: string,
        Ulica: string,
        NrNieruchomosci: string,
        NrLokalu: string | null,
        Typ: string,
        SilosID: string,
        DataZakonczeniaDzialalnosci: string | null,
        MiejscowoscPoczty: string,
    } | null,
    is_paid: boolean,
    created_at: string,
    updated_at: string | null,
    company_id: number,
}

export interface NoteDataType {
    id: number,
    title: string,
    field_type: 'negative' | 'positive' | 'neutral'
}

export interface MarkDataType {
    id: number,
    title: string,
    color: string
}

export interface CandidateNotesType {
    id: number,
    company_id: number,
    note_ids: number[],
    candidate_id: number,
}

export interface CandidateMarkType {
    id: number,
    company_id: number,
    score_id: number,
    candidate_id: number,
}

export interface UserDataType {
    agree_rights: boolean,
    auth_provider: any,
    created_at: string,
    email: string,
    email_confirmed: boolean,
    first_name: string,
    last_name: string,
    id: number,
    is_active: boolean,
    last_login: any,
    mobile_number: string,
    updated_at: string,
    username: string | null
}

export interface CandidateDataType {
    id: number,
    first_name: string,
    last_name: string,
    salary_amount_low: number | null,
    salary_amount_up: number | null,
    location: AddressType | null,
    job_experience_id: number | null,
    job_position_id: number | null,
    salary_tax_type_id: number | null,
    salary_time_type_id: number | null,
    account_facebook: string | null,
    account_instagram: string | null,
    account_twitter: string | null,
    account_youtube: string | null,
    job_industry: number | null,
    logo?: MediaType | null,
    handwritingPhoto?: MediaType | null,
    video?: MediaType | null,
    photos?: MediaType[] | null,
    certificates?: MediaType[] | null,
}

export interface CandidatesFiltersType {
    sorting_id: number;
    positions_id: number[];
    locations_id: AddressType[];
    distance: number;
    availability_id: number[];
    workModes_id: number[];
    contracts_id: number[];
    languages_id: number[];
    only_with_cv: boolean;
}

export interface UserEventType {
    id: number,
    attendees: [{
        candidate: {
            candidate_id: number,
            first_name: string | null,
            last_name: string | null
        },
        employer_id: number
    }],
    location: AddressType | null,
    title: string,
    start_time: string,
    end_time: string,
    description: string,
    notes: string,
    event_id: string,
    is_phone: boolean,
    candidate_first_name: string,
    candidate_second_name: string,
    company_name: string,
    job_offer: number,
    job_position: number
}

export interface UserAdvertType {
    id: number,
    is_active: boolean,
    num_views: number,
    location: AddressType | null,
    salary_amount_up: string | null,
    salary_amount_low: string | null,
    salary_tax_type_id: number | null,
    salary_time_type_id: number | null,
    type_of_contract_id: number | null,
    salary: {
        id: number,
        salary_amount_up: string | null,
        salary_amount_low: string | null,
        salary_tax_type_id: number | null,
        salary_time_type_id: number | null,
        type_of_contract_id: number | null,
    }[],
    description: string | null,
    working_hour_down: string | null,
    working_hour_up: string | null,
    expiration_time: string,
    company_id: number,
    job_experience_id: number | null,
    job_position_id: number | null,
    job_mode_id: number | null,
    job_start_id: number | null,
    trial_type_id: number | null,
    trial_time_id: number | null,
    known_languages_id: number[],
    requirements_ids: number[],
    benefits_ids: number[],
    duties_ids: number[],
    candidate_data: {
        candidate_id: number,
        fit_rating: number
    }[],
}

export type NewUserAdvertType = PartialBy<UserAdvertType, 'company_id' | 'expiration_time' | 'id' | 'is_active' | 'num_views' | 'candidate_data'>;

export interface JobIndustryType {
    name: string,
    id: number,
    icon: string,
    job_positions: JobPositionType[]
}

export interface JobExperienceType {
    name: string,
    id: number
}

export interface JobModeType {
    name: string,
    id: number
}

export interface JobSalaryModeType {
    name: string,
    id: number
}

export interface JobTrialTimesType {
    name: string,
    id: number
}

export interface JobTrialType {
    name: string,
    id: number
}

export interface JobStartFromType {
    name: string,
    id: number
}

export interface JobSalaryTaxType {
    name: string,
    id: number
}

export interface JobPositionType {
    name: string,
    id: number
}

export interface JobSortingModeType {
    name: string,
    id: number
}

export interface JobAvailabilityType {
    name: string,
    id: number
}

export interface JobWorkModeType {
    name: string,
    id: number
}

export interface JobContractType {
    name: string,
    id: number
}

export interface LanguageType {
    name: string,
    id: number,
    isPopular?: boolean,
}

export interface ServiceType {
    name: string,
    id: number,
    isPopular?: boolean,
}

export interface EmployeesAmountType {
    name: string,
    id: number,
}

export interface CompanyRegistrationAddresType {
    street: string,
    postalCode: string,
    locality: string,
}

export interface CompanyDataType {
    id: number,
    job_industry: number | null,
    name: string | null,
    registration_name: string | null,
    nip: string | null,
    registration_address: CompanyRegistrationAddresType | null,
    address: AddressType | null,
    description: string | null,
    contactPersons: ContactPersonType[],
    services?: number[] | null,
    logo?: MediaType | null,
    photos?: MediaType[] | null,
    certificates?: MediaType[] | null,
    employees_amount?: number | null,
    square_footage?: string | null,
    languages?: number[] | null,
    website?: string | null,
    account_facebook?: string | null,
    account_instagram?: string | null,
    account_linkedIn?: string | null,
}

export type MediaType = {
    id?: number,
    company_id?: number,
    name?: string,
    path: string,
    mime?: string,
    order?: number,
    beforePath?: string,
}

export interface ContactPersonType {
    id?: number,
    company_id?: number,
    email: string | null,
    mobile_number: string | null,
    contact_hours: string | null,
    preferred_mobile_number: boolean,
    preferred_email: boolean,
}

export interface AddressType {
    adminArea: string | null,
    country: string | null,
    countryCode: string | null,
    formattedAddress: string | null,
    locale: string | null,
    locality: string | null,
    position: {
        lat: number,
        lng: number
    } | null,
    postalCode: string | null,
    streetName: string | null,
    streetNumber: string | null,
    subAdminArea: string | null,
    subLocality: string | null,
    flat_number: string | null,
}

export interface QuestionType {
    id: string,
    question: string,
    checked?: boolean,
}

export interface QuestionsCategoryType {
    id: string,
    category: string,
    questions: QuestionType[],
}

export interface UserQuestionsType {
    id: string,
    name: string,
    list: QuestionsCategoryType[]
}

export interface UserSettingsType {
    notifications: number[] | null,
    cookies: number[] | null,
}

export interface SnackbarMessageType {
    type: 'success' | 'error',
    text: string,
};