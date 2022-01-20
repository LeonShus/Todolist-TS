export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

type AppActionsType = SetLoadingBarStatusAT | SetErrorAT

export type SetLoadingBarStatusAT = ReturnType<typeof setLoadingBarStatusAC>
export const setLoadingBarStatusAC = (status: RequestStatusType) => {
    return{
        type: 'APP/SET-STATUS',
        status
    } as const
}

export type SetErrorAT = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string | null) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}