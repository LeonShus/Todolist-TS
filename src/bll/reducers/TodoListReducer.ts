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
            let todo : TodoListDomainType = {...action.payload.todos, filter: "all", entityStatus: "idle"}
            state.unshift(todo)
        },
        removeTodoListAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if(index > -1){
                state.slice(index, 1)
            }
        },
        changeTodoListTitleAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string, title: string }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if(index > -1){
                state[index].title = action.payload.title
            }
        },
        filterTodoListAC(state: Array<TodoListDomainType>, action: PayloadAction<{ filter: FilterTasksType, id: string }>) {

        },
        setTodoListsAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todos: TodoListType[] }>) {

        },
        changeTodoListEntityStatusAC(state: Array<TodoListDomainType>, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            let index = state.findIndex(el => el.id === action.payload.todoListId)
            if(index > -1){
                state[index].entityStatus = action.payload.entityStatus
            }
        },
    }
})

export const  todoListReducer = slice.reducer

export const {
    addTodolistAC,
    removeTodoListAC,
    changeTodoListTitleAC,
    filterTodoListAC,
    setTodoListsAC,
    changeTodoListEntityStatusAC
} = slice.actions

export const todoListReducer1 = (state: Array<TodoListDomainType> = initialState, action: any): Array<TodoListDomainType> => {
    switch (action.type) {
        // case "REMOVE-TODOLIST":
        //     return state.filter(tl => tl.id !== action.todoListId)
        // case "ADD-TODOLIST":
        //     let newTodoList: TodoListDomainType = {...action.todos, filter: "all", entityStatus: "idle"}
        //     return [newTodoList, ...state]
        // case "CHANGE-TODOLIST-TITLE":
        //     return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "SET-TODOLISTS":
            let todos: TodoListDomainType[] = action.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
            return [
                ...state,
                ...todos
            ]
        // case "CHANGE-TODOLIST-ENTITY-STATUS":
        //     return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.entityStatus} : el)
        default:
            return state
    }
}


//THUNK

export const setTodosTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

export const createTodosTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))

    todolistApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                handleServerAppError<{ item: TodoListType }>(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

export const deleteTodosTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    dispatch(changeTodoListEntityStatusAC(todoListId, "loading"))

    todolistApi.deleteTodolist(todoListId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTodoListAC(todoListId))
                dispatch(changeTodoListEntityStatusAC(todoListId, "idle"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

export const changeTodosTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(changeTodoListTitleAC(todolistId, title))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC(error.massage))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC("idle"))
        })
}

