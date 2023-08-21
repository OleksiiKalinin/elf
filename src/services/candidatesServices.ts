import axios, { baseURL, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { CandidateDataType, CandidateMarkType, CandidateNotesType, UserAdvertType } from "../store/reducers/types";

const getCandidateNotes = (token: string | null, id: number) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/candidate_notes/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch(generalActions.setCandidateNotes(res.data));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const getCandidateMarks = (token: string | null, id: number) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/candidate_scores/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
        dispatch(generalActions.setCandidateMarks(res.data));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const setCandidateNotes = (token: string | null, note_ids: number[], mainIds: { candidate_id: number, company_id: number }, allNotes: CandidateNotesType[], notesId?: number) => async (dispatch: Dispatch<any>) => {
    try {
        const { data } = await axios[notesId !== undefined ? 'put' : 'post'](`/employer/candidate_notes/${notesId !== undefined ? `${notesId}/` : ''}`, {
            ...mainIds,
            note_ids
        }, { headers: { Authorization: `Bearer ${token}` } });
        dispatch(generalActions.setCandidateNotes([...allNotes.filter(e => e.id !== notesId), data]));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

const setCandidateMarks = (token: string | null, score_id: number | null, mainIds: { candidate_id: number, company_id: number }, allMarks: CandidateMarkType[], markId?: number) => async (dispatch: Dispatch<any>) => {
    try {
        console.log(score_id,
            mainIds,
            allMarks,
            markId);
        
        let data = null;
        if (score_id) {
            const res = await axios[markId !== undefined ? 'put' : 'post'](`/employer/candidate_scores/${markId !== undefined ? `${markId}/` : ''}`, {
                ...mainIds,
                score_id
            }, { headers: { Authorization: `Bearer ${token}` } });
            data = res.data;
        } else {
            // dont work
            axios.delete(`/employer/candidate_scores/${markId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => { });
        }
        dispatch(generalActions.setCandidateMarks([...allMarks.filter(e => e.id !== markId), ...(data ? [data] : [])]));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

export default {
    getCandidateNotes,
    getCandidateMarks,
    setCandidateNotes,
    setCandidateMarks,
}