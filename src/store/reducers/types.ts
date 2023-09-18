import { SwipeablePanelNoControlProps } from "../../components/organismes/SwipeablePanel"

export interface generalReducerState {
    isTabbarVisible: boolean,
    // windowWidth: number,
    // windowHeight: number,
    theme: string,
    currentScreen: string,
    token: string | null,
    refresh_token: string | null,
    profileHelpScreenDisplayed: boolean,
    isMainMenuFlatList: boolean,
    appLoading: boolean,
    swipeablePanelProps: SwipeablePanelNoControlProps | null,
    userData: UserDataType | null,
    jobIndustries: JobIndustryType[],
    jobSalaryModes: JobSalaryModeType[],
    jobSalaryTaxes: JobSalaryTaxType[],
    jobExperiences: JobExperienceType[],
    userCompany: CompanyDataType | null,
    userAdverts: UserAdvertType[],
    userEvents: UserEventType[],
    candidateNotes: CandidateNotesType[],
    candidateMarks: CandidateMarkType[],
    marksData: MarkDataType[],
    notesData: NoteDataType[],
    userInvoices: InvoiceType[]
}

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
    id?: number,
    num_views?: number,
    location: AddressType | null,
    salary_amount_up: string | null,
    salary_amount_low: string | null,
    description: string | null,
    working_hour_down: string | null,
    working_hour_up: string | null,
    expiration_time: string | null,
    company_id: number | null,
    job_experience_id: number | null,
    job_position_id: number | null,
    job_mode_id: number | null,
    job_start_id: number | null,
    trial_type_id: number | null,
    trial_time_id: number | null,
    salary_tax_type_id: number | null,
    salary_time_type_id: number | null,
    type_of_contract_id: number | null,
    known_language_id: number | null,
    requirements_ids: number[],
    benefits_ids: number[],
    duties_ids: number[],
    candidate_data: {
        candidate_id: number,
        fit_rating: number
    }[],
}

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

export interface JobSalaryModeType {
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

export interface CompanyDataType {
    short_name: string | null,
    full_name: string | null,
    main_address: AddressType | null,
    other_address: AddressType | null,
    short_decription: string | null,
    full_decription: string | null,
    employees_amount: string | null,
    square_footage: string | null,
    contact_hours: string | null,
    website: string | null,
    account_facebook: string | null,
    account_instagram: string | null,
    account_twitter: string | null,
    account_youtube: string | null,
    job_industry: number | null,
    logo?: MediaType | null,
    video?: MediaType | null,
    photos?: MediaType[] | null,
    certificates?: MediaType[] | null,
    id?: number,
    contactPersons?: ContactPersonType[] | null,
    // contactPersons?: ContactPersonType[] | null,
}

export type MediaType = {
    company_id?: number,
    id?: number,
    path: string,
    mime?: string,
    order?: number,
    duration?: number,
}

export interface ContactPersonType {
    email: string | null,
    mobile_number: string | null,
    link: string | null,
    account_facebook: string | null,
    account_instagram: string | null,
    account_twitter: string | null,
    account_youtube: string | null,
    company_id?: number,
    id: number,
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