import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import generalActions from '../store/actionCreators/general/actions';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(generalActions, dispatch);
}

