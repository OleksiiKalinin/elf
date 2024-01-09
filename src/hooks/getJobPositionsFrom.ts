import { JobIndustryType, JobPositionType } from "../store/reducers/types";

export default function getJobPositionsFrom(industries: JobIndustryType[], industryId: number): JobPositionType[] {
    return industries.find(({ id }) => id === industryId)?.job_positions || [];
}