import React, {ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";
import {Button} from "../DefaultComponent/Button/Button";
import classes from "./TodoList.module.css"
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (tasksID: string, todoListID: string) => void
    filterTasks: (filter: FilterTasksType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: FilterTasksType
    remoteTodoLost: (todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    //Do Array of jsx Elements
    const arrayOfTasksLi = props.tasks.map(el => {
            const removeTaskBtn = () => props.removeTask(el.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                return props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
            }
            const editableSpanCallBack = (title: string) => {
                props.changeTaskTitle(el.id, title, props.id)
            }
            return (
                <li key={el.id} className={`${el.isDone ? classes.isDone : ""} ${classes.liStyle}`}>

                    <input onChange={onChangeHandler}
                           type="checkbox"
                           checked={el.isDone}/>
                    <EditableSpan title={el.title} callBack={editableSpanCallBack}/>
                    <Button style={classes.btnStyle} name="&#x2716;" callback={removeTaskBtn}/>
                </li>
            )
        }
    )

    const filterButtons = (val: FilterTasksType) => {
        props.filterTasks(val, props.id)
    }
    //

    //Callback To addTask
    const addTaskCallback = (text: string) => {
        props.addTask(text, props.id)
    }

    const changetoDoListTitleCallback = (toDoListTitle: string) => {
        props.changeTodolistTitle(toDoListTitle, props.id)
    }

    return (
        <div className={classes.container}>
            <EditableSpan title={props.title} callBack={changetoDoListTitleCallback}/>
            <Button name="&#x2716;" callback={() => props.remoteTodoLost(props.id)}/>

            <AddItemForm addItem={addTaskCallback}/>

            <ul>
                {arrayOfTasksLi}
            </ul>
            <div>
                <Button style={props.filter === "all" ? classes.activeFilter : classes.btnDefault}
                        name="All"
                        callback={() => filterButtons("all")}
                />
                <Button style={props.filter === "active" ? classes.activeFilter : classes.btnDefault}
                        name="Active"
                        callback={() => filterButtons("active")}
                />
                <Button style={props.filter === "completed" ? classes.activeFilter : classes.btnDefault}
                        name="Completed"
                        callback={() => filterButtons("completed")}
                />
            </div>
        </div>
    );
}

