import {FilterTasksType, TodoListType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const ADD_TODOLIST = "ADD-TODOLIST"
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER"

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | FilterTodoList

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newId = v1()
            const newTodoList: TodoListType = {id: newId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
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