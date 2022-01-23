import {setErrorAC} from "../bll/reducers/AppReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolistApi";


export const handleServerAppError = <T>(dispatch: Dispatch<any>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("Some error occured"))
    }
}