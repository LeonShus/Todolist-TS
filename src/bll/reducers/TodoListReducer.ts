import {Dispatch} from "redux";
import {RequestResultCode, todolistApi} from "../../api/todolistApi";
import {RequestStatusType, setErrorAC, SetErrorAT, setLoadingBarStatusAC, SetLoadingBarStatusAT} from "./AppReducer";


export type ActionsType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | FilterTodoListAT
    | SetTodoListsAT
    | ChangeTodoListEntityStatusAT
    | SetLoadingBarStatusAT
    | SetErrorAT

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
    entityStatus: RequestStatusType
}

export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            let newTodoList: TodoListDomainType = {...action.todos, filter: "all", entityStatus: "idle"}
            return [newTodoList, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "SET-TODOLISTS":
            let todos: TodoListDomainType[] = action.todos.map(el => ({...el, filter: "all", entityStatus: "idle"}))
            return [
                ...state,
                ...todos
            ]
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.entityStatus} : el)
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

export type ChangeTodoListEntityStatusAT = ReturnType<typeof changeTodoListEntityStatusAC>
export const changeTodoListEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: "CHANGE-TODOLIST-ENTITY-STATUS",
        todolistId,
        entityStatus
    } as const
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

export const deleteTodosTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    dispatch(changeTodoListEntityStatusAC(todolistId, "loading"))

    todolistApi.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTodoListAC(todolistId))
                dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
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

export const changeTodosTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingBarStatusAC("loading"))
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(changeTodoListTitleAC(todolistId, title))
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

