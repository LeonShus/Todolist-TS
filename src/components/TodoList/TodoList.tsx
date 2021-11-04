import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";
import {Button} from "./DefaultComponent/Button";
import classes from "./TodoList.module.css"


type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (tasksID: string) => void
    filterTasks: (filter: FilterTasksType) => void
    addTask: (e: string) => void
    checkChangeStatus: (id: string) => void
    filter: FilterTasksType
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
            props.addTask(newTitleText.trim())
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
    const removeTaskBtn = (tId: string) => props.removeTask(tId)
    const onChangeHandler = (tId: string) => props.checkChangeStatus(tId)

    const arrayOfTasksLi = props.tasks.map(el => {
            return (
                <li key={el.id} className={el.isDone ? classes.isDone : ""}>
                    <input onChange={() => onChangeHandler(el.id)}
                           type="checkbox"
                           checked={el.isDone}/>
                    <span>{el.title}</span>
                    <Button name="X" callback={() => removeTaskBtn(el.id)}/>
                </li>
            )
        }
    )

    const filterButtons = (val: FilterTasksType) => {
        props.filterTasks(val)
    }

    const targetBtnClass = (e: string) => {
        return props.filter === e ? classes.activeFilter : classes.btnDefault
    }

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={keyAdd}
                       onChange={changeTitleVal}
                       value={newTitleText}
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

