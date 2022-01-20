import {Dispatch} from "redux";
import {RequestResultCode, todolistApi} from "../../api/todolistApi";
import {setErrorAC, setLoadingBarStatusAC} from "./AppReducer";


export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | FilterTodoListAT | SetTodoListsAT

const initialState: Array<TodoListDomainType> = []


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type FilterTasksType = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
    filter: FilterTasksType
}

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            let newTodoList: TodoListDomainType = {...action.todos, filter: "all"}
            return [newTodoList, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "SET-TODOLISTS":
            let todos: TodoListDomainType[] = action.todos.map(el => ({...el, filter: "all"}))
            return [
                ...state,
                ...todos
            ]
        default:
            return state
    }
}

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    } as const
}

export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todos: TodoListType) => {
    return {
        type: "ADD-TODOLIST",
        todos,
    } as const
}

type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistId: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        todolistId
    } as const
}

type FilterTodoListAT = ReturnType<typeof filterTodoListAC>
export const filterTodoListAC = (filter: FilterTasksType, id: string) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter,
        id
    } as const
}

export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todos: TodoListType[]) => {
    return {
        type: "SET-TODOLISTS",
        todos
    } as const
}


//THUNK

export const setTodosTC = () => (dispatch: any) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodoListsAC(res.data))

            dispatch(setLoadingBarStatusAC("idle"))
        })
}

export const createTodosTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setLoadingBarStatusAC("idle"))
            } else {
                if(res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occured'))
                }
                dispatch(setLoadingBarStatusAC("failed"))
            }
        })
}

export const deleteTodosTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setLoadingBarStatusAC("idle"))
            } else {
                if(res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occured'))
                }
                dispatch(setLoadingBarStatusAC("failed"))
            }
        })
}

export const changeTodosTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(changeTodoListTitleAC(todolistId, title))
                dispatch(setLoadingBarStatusAC("idle"))
            } else {
                if(res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occured'))
                }
                dispatch(setLoadingBarStatusAC("failed"))
            }
        })
}

