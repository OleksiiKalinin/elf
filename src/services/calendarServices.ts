import axios, { dynamicHeaders, errorHandler } from "./index";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { AddressType, UserAdvertType, UserEventType } from "../store/reducers/types";
import { AppDispatch, rootState } from "../store";

const getUserEvents = () => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const res = await axios.get(`/employer/events/`, { headers: dynamicHeaders({ token }) });
        await dispatch(generalActions.setUserEvents(
            res.data ?
                res.data.map((event: any) => ({
                    ...event,
                    location: convertToFrontEndAddress(event.location)
                }))
                :
                []
        ));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: getUserEvents.bind(this) });
    }
};

const createUserEvent = (data: {
    is_phone: boolean,
    candidate_id: number,
    location: AddressType | null,
    start_time: string,
    end_time: string,
    company_name: string,
    job_offer: number,
    job_position: number,
    candidate_first_name: string,
    candidate_second_name: string,
}, allEvents: UserEventType[]) => async (dispatch: AppDispatch, getState: () => rootState) => {
    const { token } = getState().general;

    try {
        const { is_phone, candidate_id, company_name, candidate_first_name, candidate_second_name, end_time, job_position, job_offer, location, start_time } = data;
        const res = await axios.post(`/employer/events/`, {
            attendees: [{ candidate_id }],
            location: convertToBackEndAddress(location),
            title: "string",
            start_time,
            end_time,
            description: "string",
            notes: "string",
            event_id: "string",
            is_phone,
            candidate_first_name,
            candidate_second_name,
            company_name,
            job_offer,
            job_position
        }, { headers: dynamicHeaders({ token }) });

        await dispatch(generalActions.setUserEvents([...allEvents, res.data]));
        return true;
    } catch (error: any) {
        return await errorHandler({ error, dispatch, getState, caller: createUserEvent.bind(this, data, allEvents ) });
    }
};

export default {
    getUserEvents,
    createUserEvent
}