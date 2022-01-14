import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT, todoListId_01, todoListId_02,} from "./TodoListReducer";

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low = 0,
    Middle,
    Hi,
    Urgent,
    Later
}

export type TasksType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type ActionsType =
    removeTaskAT
    | addTaskACT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT

const initialState: TasksStateType = {
    [todoListId_01]:
        [
            {
                id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "bib", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "bob", status: TaskStatuses.New, todoListId: todoListId_01,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
    [todoListId_02]:
        [
            {
                id: v1(), title: "asd", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "qqqq", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "biasd", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "boasd", status: TaskStatuses.New, todoListId: todoListId_02,
                completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                order: 0, priority: TaskPriorities.Low
            },
        ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]: [
                    {
                        id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todoListId,
                        completed: false, addedDate: "", deadline: "", description: "", startDate: "",
                        order: 0, priority: TaskPriorities.Low
                    },
                    ...state[action.todoListId],
                ],
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? {...el, status: action.status} : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todos.id]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        default:
            return state
    }
}

type removeTaskAT = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todoListId,
    } as const
}

type addTaskACT = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todoListId
    } as const
}

type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        status,
        todoListId
    } as const
}

type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todoListId
    } as const
}
