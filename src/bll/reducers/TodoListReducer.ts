// import {FilterTasksType} from "../../AppWithRedux";
import {v1} from "uuid";

export const todoListId_01 = v1()
export const todoListId_02 = v1()
export const todoListId_03 = v1()

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | FilterTodoListAT

const initialState: Array<TodoListType> = [
    {id: todoListId_01, title: "WantTo sell", filter: "all"},
    {id: todoListId_02, title: "Want to buy", filter: "all"},
    {id: todoListId_03, title: "Want to buy", filter: "all"},
]

export type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}

export type FilterTasksType = "all" | "active" | "completed"


export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
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
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    } as const
}

export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todoListId
    } as const
}

type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (title: string, id: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        id
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