import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;