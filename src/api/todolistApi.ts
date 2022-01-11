import axios from "axios";
import {TodoListType} from "../bll/reducers/TodoListReducer";
import {TasksType} from "../bll/reducers/TaskReducer";

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
        return instance.post<TodosResponseType<{item: TodoListType}>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodosResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodosResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    //Tasks
    getTasks(todolistId: string){
        return instance.get<TasksResponseType<Array<TasksType>>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    }
}


type TodosResponseType<T> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    order: number
    data: T
}

type TasksResponseType<T> = {
    error: any
    totalCount: number
    items: T
}


