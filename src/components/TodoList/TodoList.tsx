import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";


type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (tasksID: string) => void
    filterTasks: (filter: FilterTasksType) => void
    addTask: (e: string) => void
    checkChange: (e: string) => void
}

function TodoList(props: TodoListPropsType) {
    console.log(props, "TodoList")

    let [newTitleText, SetNewTitleText] = useState<string>("")

    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        SetNewTitleText(e.currentTarget.value)
    }
    const addTask = () => {
        props.addTask(newTitleText)
    }
    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const arrayOfTasksLi = props.tasks.map(el => {
            const checkChange = () => props.checkChange(el.id)
            const removeTask = () => props.removeTask(el.id)
            return (
                <li key={el.id}>
                    <input onClick={checkChange} type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        }
    )
    const allFilter = () => {
        props.filterTasks("all")
    }
    const activeFilter = () => {
        props.filterTasks("active")
    }
    const completedFilter = () => {
        props.filterTasks("completed")
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={keyAdd}
                       onChange={changeTitleVal}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {arrayOfTasksLi}
            </ul>
            <div>
                <button onClick={allFilter}>All</button>
                <button onClick={activeFilter}>Active</button>
                <button onClick={completedFilter}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
