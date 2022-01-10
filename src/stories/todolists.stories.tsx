import React, {useEffect, useState} from "react"
import {todolistApi} from "../api/todolistApi";
import {AddItemForm} from "../components/DefaultComponent/Input/AddItemForm";


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
    let title = "Fqwe"
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
    let todolistId = "0532a6cc-8792-49c5-8a65-46b806579413"

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

export const CrudTodoLists = () => {

    const addItem = (title: string) => {
        todolistApi.createTodolist(title)
            .then(res => {
                console.log(res)
                getTodos()
            })
    }
    const deleteItem = (todolistId: string) => {
        todolistApi.deleteTodolist(todolistId)
            .then(res => {
                console.log(res)
                getTodos()
            })
    }

    const changeTitle = (todolistId: string) => {
        let title = "Changed"
        todolistApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                console.log(res)
                getTodos()
            })
    }

    const getTodos = () => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div>
            add
            <AddItemForm addItem={addItem}/>
            delete
            <AddItemForm addItem={deleteItem}/>
            changeTitle
            <AddItemForm addItem={changeTitle}/>
            TodoLists
            <div> {JSON.stringify(state)}</div>

        </div>
    )
}