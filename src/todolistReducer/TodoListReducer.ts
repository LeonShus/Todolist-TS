import {FilterTasksType, TodoListType} from "../App";
import {v1} from "uuid";



const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | FilterTodoList

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return{
        type: "REMOVE-TODOLIST",
        todoListId
    } as const
}

export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todoListId: string) => {
    return{
        type: "ADD-TODOLIST",
        title,
        todoListId
    } as const
}

type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    id: string
    title: string
}

type FilterTodoList = {
    type: typeof CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterTasksType
}