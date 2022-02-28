import {Dispatch} from "redux"
import {isInitializedAC, setErrorAC, setLoadingBarStatusAC} from "./AppReducer";
import {authApi, RequestResultCode} from "../../api/todolistApi";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

export const {setIsLoggedInAC} = slice.actions


// thunks
export const loginTC = (data: AuthDataType) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: "Some error occured"}))
                }
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const authMe = () => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    authApi.authMe()
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(isInitializedAC({isInitialized: true}))
            } else {
                dispatch(isInitializedAC({isInitialized: true}))
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const logOut = () => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(setIsLoggedInAC({value: false}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: "Some error occured"}))
                }
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

// types

export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}