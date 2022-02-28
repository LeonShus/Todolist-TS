import React, {useEffect, useState} from "react"
import {todolistApi, UpdateTaskParamType} from "../api/todolistApi";
import {AddItemForm} from "../components/DefaultComponent/Input/AddItemForm";
import {TaskPriorities, TaskStatuses} from "../bll/reducers/TaskReducer";


export default {
    title: "API"
}

//TODOLIST
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
//TASKS
export const getTasksFromTodos = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "7d0aeacb-947a-4175-beb8-2eb5a22629ee"

    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then(res => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "7d0aeacb-947a-4175-beb8-2eb5a22629ee"
    let title = "QQQ"

    useEffect(() => {
        todolistApi.createTask(todolistId, title)
            .then(res => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "7d0aeacb-947a-4175-beb8-2eb5a22629ee"
    let taskId = "827a0e83-ad4c-44e2-af14-58bb8a960dc6"

    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "7d0aeacb-947a-4175-beb8-2eb5a22629ee"
    let taskId = "7fe9727f-bbbe-447e-bea1-48bbc68fb327"
    let changedTask: UpdateTaskParamType = {
        title: "WTT", startDate: "", status: TaskStatuses.Completed,
        completed: false, deadline: "", description: '', priority: TaskPriorities.Low
    }

    useEffect(() => {
        todolistApi.upgradeTask(todolistId, taskId, changedTask)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


//Full Test
export const CrudTodoLists = () => {

    const addItem = (title: string) => {
        todolistApi.createTodolist(title)
            .then(res => {

                getTodos()
            })
    }
    const deleteItem = (todolistId: string) => {
        todolistApi.deleteTodolist(todolistId)
            .then(res => {

                getTodos()
            })
    }

    const changeTitle = (todolistId: string) => {
        let title = "Changed"
        todolistApi.updateTodolistTitle(todolistId, title)
            .then((res) => {

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