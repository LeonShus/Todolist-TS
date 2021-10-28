import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";
import { Button } from "./DefaultComponent/Button";


type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (tasksID: string) => void
    filterTasks: (filter: FilterTasksType) => void
    addTask: (e: string) => void
    checkChange: (e: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    console.log(props, "TodoList")

    let [newTitleText, SetNewTitleText] = useState<string>("")

    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        SetNewTitleText(e.currentTarget.value)
    }
    const addTask = () => {
        if(newTitleText.trim()){
            props.addTask(newTitleText.trim())
        }
    }
    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    // let [filter, SetFilter] = useState<FilterTasksType>("all")
    // let tasksToRender = props.tasks
    //
    // if (filter === "active"){
    //     tasksToRender = props.tasks.filter(el => el.isDone === false)
    // }
    // if (filter === "completed"){
    //     tasksToRender = props.tasks.filter(el => el.isDone === true)
    // }
    // //Filtered
    // const filterTasks = (filter: FilterTasksType) => {
    //     SetFilter(filter)
    // }




    //Do Array of jsx Elements
    const removeTaskBtn = (tId: string) => props.removeTask(tId)
    const onChangeHandler = (tId: string) => props.checkChange(tId)

    const arrayOfTasksLi = props.tasks.map(el => {
            return (
                <li key={el.id}>
                    <input onClick={() => onChangeHandler(el.id)} type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    <Button name='X' callback={() => removeTaskBtn(el.id)}/>
                </li>
            )
        }
    )

    const filterButtons = (val : FilterTasksType) => {
        props.filterTasks(val)
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={keyAdd}
                       onChange={changeTitleVal}
                />
                <Button name='+' callback={addTask}/>
            </div>

            <ul>
                {arrayOfTasksLi}
            </ul>
            <div>

                <Button name='All' callback={() => filterButtons('all')}/>
                <Button name='Active' callback={() => filterButtons('active')}/>
                <Button name='Completed' callback={() => filterButtons('completed')}/>

            </div>
        </div>
    );
}

