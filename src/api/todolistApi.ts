import axios from "axios";
import {TodoListType} from "../bll/reducers/TodoListReducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "099be23b-024b-4d04-8aea-ded1a22de046"
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoListType>>("todo-lists",)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}


type ResponseType<T> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    order: number
    data: T
}