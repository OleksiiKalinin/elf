import axios, { errorHandler } from "./index";
import { Dispatch } from "react";
import generalActions from "../store/actionCreators/general/actions";
import { convertToBackEndAddress, convertToFrontEndAddress } from "../hooks/convertAddress";
import { AddressType, UserAdvertType, UserEventType } from "../store/reducers/types";

const getUserEvents = (token: string | null) => async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.get(`/employer/events/`, { headers: { Authorization: `Bearer ${token}` } });
        await dispatch(generalActions.setUserEvents(
            res.data ?
                res.data.map((event: any) => ({
                    ...event,
                    location: convertToFrontEndAddress(event.location)
                }))
                :
                []
        ));
    } catch (error: any) {
        await errorHandler(error, dispatch);
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
}, token: string | null, allEvents: UserEventType[]) => async (dispatch: Dispatch<any>) => {
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
        }, { headers: { Authorization: `Bearer ${token}` } });

        await dispatch(generalActions.setUserEvents([...allEvents, res.data]));
    } catch (error: any) {
        await errorHandler(error, dispatch);
    }
};

export default {
    getUserEvents,
    createUserEvent
}