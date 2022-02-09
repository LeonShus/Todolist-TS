import {
    AddTodoListAT,
    changeTodoListEntityStatusAC,
    ChangeTodoListEntityStatusAT,
    RemoveTodoListAT,
    SetTodoListsAT,
} from "./TodoListReducer";
import {Dispatch} from "redux";
import {RequestResultCode, todolistApi, UpdateTaskParamType} from "../../api/todolistApi";
import {handleServerAppError} from "../../utils/error-utils";
import { setErrorAC, setLoadingBarStatusAC } from "./AppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{todolistId: string, task: TasksType}>){

        },
        removeTaskAC(state, action: PayloadAction<{todoListId: string, taskId: string}>){

        },
        changeTaskStatusAC(state, action: PayloadAction<{task: TasksType}>){

        },
        changeTaskTitleAC(state, action: PayloadAction<{task: TasksType}>){

        },

    }
})





type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (task: TasksType) => {
    return {
        type: "CHANGE-TASK-TITLE",
        task
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
                [action.todolistId]: [
                    action.task,
                    ...state[action.todolistId]
                ],
            }
        case "CHANGE-TASK-STATUS":
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId]
                    .map(el => el.id === action.task.id ? action.task : el)
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

//THUNK


export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))

    todolistApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC(todolistId, "loading"))

    todolistApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
            } else {
                handleServerAppError<{ item: TasksType }>(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
            dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC(todolistId, "loading"))

    todolistApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTaskAC(todolistId, taskId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
            dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
        })
}

export const upgradeTaskTC = (todolistId: string, taskId: string, param: UpdateTaskParamType) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    todolistApi.upgradeTask(todolistId, taskId, param)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(changeTaskTitleAC(res.data.data.item))
            } else {
                handleServerAppError<{ item: TasksType }>(dispatch, res.data)
            }

        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}