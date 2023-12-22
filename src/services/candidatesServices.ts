import axios, { baseURL, dynamicHeaders, errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { CandidateDataType, CandidateMarkType, CandidateNotesType, UserAdvertType } from "../store/reducers/types";
import { AppDispatch, rootState } from "../store";

const getCandidateNotes = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const res = await axios.get(`/employer/candidate_notes/${id}/`, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setCandidateNotes(res.data));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: getCandidateNotes.bind(this, id) });
    }
};

const getCandidateMarks = (id: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const res = await axios.get(`/employer/candidate_scores/${id}/`, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setCandidateMarks(res.data));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: getCandidateMarks.bind(this, id) });
    }
};

const setCandidateNotes = (note_ids: number[], mainIds: { candidate_id: number, company_id: number }, allNotes: CandidateNotesType[], notesId?: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const { data } = await axios[notesId !== undefined ? 'put' : 'post'](`/employer/candidate_notes/${notesId !== undefined ? `${notesId}/` : ''}`, {
            ...mainIds,
            note_ids
        }, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setCandidateNotes([...allNotes.filter(e => e.id !== notesId), data]));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: setCandidateNotes.bind(this, note_ids, mainIds, allNotes, notesId) });
    }
};

const setCandidateMarks = (score_id: number | null, mainIds: { candidate_id: number, company_id: number }, allMarks: CandidateMarkType[], markId?: number) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

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
            }, { headers: dynamicHeaders({ token }) });
            data = res.data;
        } else {
            // dont work
            axios.delete(`/employer/candidate_scores/${markId}`, { headers: dynamicHeaders({ token }) }).catch(() => { });
        }
        await dispatch(generalActions.setCandidateMarks([...allMarks.filter(e => e.id !== markId), ...(data ? [data] : [])]));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: setCandidateMarks.bind(this, score_id, mainIds, allMarks, markId) });
    }
};

export default {
    getCandidateNotes,
    getCandidateMarks,
    setCandidateNotes,
    setCandidateMarks,
}