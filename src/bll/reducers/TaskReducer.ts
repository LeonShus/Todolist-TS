import {
    addTodolistAC,
    changeTodoListEntityStatusAC,
    removeTodoListAC,
    setTodoListsAC,
    TodoListType,
} from "./TodoListReducer";
import {Dispatch} from "redux";
import {RequestResultCode, todolistApi, UpdateTaskParamType} from "../../api/todolistApi";
import {handleServerAppError} from "../../utils/error-utils";
import {setErrorAC, setLoadingBarStatusAC} from "./AppReducer";
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
    name: "tasks",
    initialState,
    reducers: {
        addTaskAC(state: TasksStateType, action: PayloadAction<{ todoListId: string, task: TasksType }>) {
            state[action.payload.todoListId].unshift(action.payload.task)
        },
        removeTaskAC(state: TasksStateType, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            let tasks = state[action.payload.todoListId]
            let index = tasks.findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        upgradeTaskAC(state: TasksStateType, action: PayloadAction<{ task: TasksType }>) {
            let tasks = state[action.payload.task.todoListId]
            let index = tasks.findIndex(el => el.id === action.payload.task.id)
            if (index > -1) {
                tasks[index] = action.payload.task
            }
        },
        setTasksAC(state: TasksStateType, action: PayloadAction<{ todoListId: string, tasks: TasksType[] }>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: {
        [addTodolistAC.type]: (state: TasksStateType, action: PayloadAction<{ todos: TodoListType }>) => {
            state[action.payload.todos.id] = []
        },
        [removeTodoListAC.type]: (state: TasksStateType, action: PayloadAction<{ todoListId: string }>) => {
            delete state[action.payload.todoListId]
        },
        [setTodoListsAC.type]: (state: TasksStateType, action: PayloadAction<{ todos: TodoListType[] }>) => {
            action.payload.todos.forEach(el => {
                state[el.id] = []
            })
        },

    }
})

export const tasksReducer = slice.reducer

export const {addTaskAC, removeTaskAC, upgradeTaskAC, setTasksAC} = slice.actions


//THUNK


export const setTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))

    todolistApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC({todoListId, tasks: res.data.items}))
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
        })
}

export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "loading"}))

    todolistApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(addTaskAC({todoListId, task: res.data.data.item}))
            } else {
                handleServerAppError<{ item: TasksType }>(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
            dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "idle"}))
        })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "loading"}))

    todolistApi.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(removeTaskAC({todoListId, taskId}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            dispatch(setErrorAC({error: error.massage}))
        })
        .finally(() => {
            dispatch(setLoadingBarStatusAC({status: "idle"}))
            dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: "idle"}))
        })
}

export const upgradeTaskTC = (todolistId: string, taskId: string, param: UpdateTaskParamType) => (dispatch: Dispatch) => {
    dispatch(setLoadingBarStatusAC({status: "loading"}))
    todolistApi.upgradeTask(todolistId, taskId, param)
        .then(res => {
            if (res.data.resultCode === RequestResultCode.complete) {
                dispatch(upgradeTaskAC({task: res.data.data.item}))
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