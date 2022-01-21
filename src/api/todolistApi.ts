import axios from "axios";
import {TodoListType} from "../bll/reducers/TodoListReducer";
import {TaskPriorities, TaskStatuses, TasksType} from "../bll/reducers/TaskReducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "099be23b-024b-4d04-8aea-ded1a22de046"
    }
})
export const todolistApi = {
    //Todos
    getTodos() {
        return instance.get<Array<TodoListType>>("todo-lists",)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    //Tasks
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType<Array<TasksType>>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TasksType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    upgradeTask(todolistId: string, taskId: string, param: UpdateTaskParamType) {
        return instance.put<ResponseType<{ item: TasksType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, param)
    }
}


type ResponseType<T> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    order?: number
    resultCode?: number
    data: T
}

type TasksResponseType<T> = {
    error: any
    totalCount: number
    items: T
}

export type UpdateTaskParamType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum RequestResultCode {
    complete,
    error,
    captcha = 10
}