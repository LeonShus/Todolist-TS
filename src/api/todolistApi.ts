import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "099be23b-024b-4d04-8aea-ded1a22de046"
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>("todo-lists",)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodoType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    order: number
    data: T
}