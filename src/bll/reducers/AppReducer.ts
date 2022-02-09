import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoadingBarStatusAC(state: InitialStateType, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setErrorAC(state: InitialStateType, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        isInitializedAC(state: InitialStateType, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer

export const {setLoadingBarStatusAC, setErrorAC, isInitializedAC} = slice.actions
