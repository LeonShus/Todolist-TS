import {Dispatch} from "redux"
import {
    isInitializedAC,
    IsInitializedAT,
    setErrorAC,
    SetErrorAT,
    setLoadingBarStatusAC,
    SetLoadingBarStatusAT
} from "./AppReducer";
import {authApi, RequestResultCode} from "../../api/todolistApi";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: "login/SET-IS-LOGGED-IN", value} as const)

// thunks
export const loginTC = (data: AuthDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(setIsLoggedInAC(true))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC("Some error occured"))
                }
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

export const authMe = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    authApi.authMe()
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(setIsLoggedInAC(true))
                dispatch(isInitializedAC(true))
            } else {
                dispatch(isInitializedAC(true))
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetLoadingBarStatusAT | SetErrorAT | IsInitializedAT

export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}