import {Dispatch} from "redux";
import {RequestResultCode, todolistApi} from "../../api/todolistApi";
import {RequestStatusType, setErrorAC, setLoadingBarStatusAC} from "./AppReducer";
import {handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type FilterTasksType = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
    filter: FilterTasksType
    entityStatus: RequestStatusType
}

const initialState: Array<TodoListDomainType> = []


export const slice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {
        addTodolistAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todos: TodoListType }>) {
            let todo: TodoListDomainType = {...action.payload.todos, filter: "all", entityStatus: "idle"}
            state.unshift(todo)
        },
        removeTodoListAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTodoListTitleAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string, title: string }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        filterTodoListAC(state: Array<TodoListDomainType>, action: PayloadAction<{ filter: FilterTasksType, id: string }>) {
            let index = state.findIndex(el => el.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodoListsAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todos: TodoListType[] }>) {
            let todos: TodoListDomainType[] = action.payload.todos.map(el => ({
                ...el,
                filter: "all",
                entityStatus: "idle"
            }))
            return state = todos
        },
        changeTodoListEntityStatusAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
    }
})

export const todoListReducer = slice.reducer

export const {
    addTodolistAC,
    removeTodoListAC,
    changeTodoListTitleAC,
    filterTodoListAC,
    setTodoListsAC,
    changeTodoListEntityStatusAC
} = slice.actions

//THUNK

export const setTodosTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodoListsAC({todos: res.data}))
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const createTodosTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))

    todolistApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(addTodolistAC({todos: res.data.data.item}))
            } else {
                handleServerAppError<{ item: TodoListType }>(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const deleteTodosTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "loading"}))

    todolistApi.deleteTodolist(todoListId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTodoListAC({todoListId}))
                dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "idle"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const changeTodosTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    todolistApi.updateTodolistTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(changeTodoListTitleAC({todoListId, title}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

