import {setErrorAC} from "../bll/reducers/AppReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolistApi";


export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setErrorAC({error: "Some error occured"}))
    }
}