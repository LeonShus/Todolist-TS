import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";
import {Button} from "./DefaultComponent/Button";
import classes from "./TodoList.module.css"


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
}

export const TodoList = (props: TodoListPropsType) => {
    console.log(props, "TodoList")

    let [newTitleText, setNewTitleText] = useState<string>("")
    let [error, setError] = useState("")

    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleText(e.currentTarget.value)
        setError("")
    }
    const addTask = () => {
        if (newTitleText.trim()) {
            props.addTask(newTitleText.trim(), props.id)
            setNewTitleText("")
            setError("")
        } else {
            setError("Incorrect value")
            return
        }
    }
    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    //Do Array of jsx Elements
    const arrayOfTasksLi = props.tasks.map(el => {
            const removeTaskBtn = () => props.removeTask(el.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                return props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
            }

            return (
                <li key={el.id} className={el.isDone ? classes.isDone : ""}>
                    <input onChange={onChangeHandler}
                           type="checkbox"
                           checked={el.isDone}/>
                    <span>{el.title}</span>
                    <Button name="&#x2716;" callback={removeTaskBtn}/>
                </li>
            )
        }
    )

    const filterButtons = (val: FilterTasksType) => {
        props.filterTasks(val, props.id)
    }

    const targetBtnClass = (e: string) => {
        return props.filter === e ? classes.activeFilter : classes.btnDefault
    }

    return (
        <div className={classes.container}>

            <h3>{props.title}<Button name="&#x2716;" callback={() => props.remoteTodoLost(props.id)}/></h3>

            <div>
                <input onKeyPress={keyAdd}
                       onChange={changeTitleVal}
                       value={newTitleText}
                       className={error ? classes.errorInp : ""}
                       placeholder={"Enter your task"}
                />
                <Button name="+" callback={addTask}/>
                {error && <div className={classes.error}>{error}</div>}
            </div>

            <ul>
                {arrayOfTasksLi}
            </ul>
            <div>
                <button className={targetBtnClass("all")}
                        onClick={() => filterButtons("all")}>All
                </button>

                <button className={targetBtnClass("active")}
                        onClick={() => filterButtons("active")}>Active
                </button>

                <button className={targetBtnClass("completed")}
                        onClick={() => filterButtons("completed")}>Completed
                </button>

                {/*<Button  name='All' callback={() => filterButtons('all')}/>*/}
                {/*<Button name='Active' callback={() => filterButtons('active')}/>*/}
                {/*<Button name='Completed' callback={() => filterButtons('completed')}/>*/}
            </div>
        </div>
    );
}

