import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT,} from "./TodoListReducer";
import {Dispatch} from "redux";
import {todolistApi} from "../../api/todolistApi";

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
    | SetTasksAT
const initialState: TasksStateType = {}

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
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
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

export type SetTasksAT = ReturnType<typeof setTasks>
export const setTasks = (todolistId: string, tasks: TasksType[]) => {
    return {
        type: "SET-TASKS",
        tasks,
        todolistId
    } as const
}

//THUNK

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => {
            console.log(res)
            dispatch(setTasks(todolistId, res.data.items))
        })
}

