import React, {useEffect, useState} from "react"
import {todolistApi} from "../api/todolistApi";

export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = "FFFFF"
    useEffect(() => {
        todolistApi.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "429c952b-d0c7-40d4-9369-029bdc5cde8a"

    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "fd01e9d6-82fe-45d7-96d0-ed94738745f7"
    let title = "qweqwe"
    useEffect(() => {
        todolistApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
