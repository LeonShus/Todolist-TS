import React, {ChangeEvent, useCallback} from "react";
import {FilterTasksType, TasksType} from "../../AppWithRedux";
import classes from "./TodoList.module.css"
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {Clear, Delete} from "@mui/icons-material";
import {Tasks} from "./Tasks/Tasks";


type TodoListPropsType = {
    todoListId: string
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

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("TODOLIST")
    //Filter tasks to UI
    let tasksToRender = props.tasks
    if (props.filter === "active") {
        tasksToRender = props.tasks.filter(el => !el.isDone)
    }
    if (props.filter === "completed") {
        tasksToRender = props.tasks.filter(el => el.isDone)
    }
    //Do Array of jsx Elements TASKS ITEM
    const arrayOfTasksLi = tasksToRender.map(el => {
            return (
                <Tasks
                    key={el.id}
                    taskId={el.id}
                    isDone={el.isDone}
                    title={el.title}
                    removeTask={props.removeTask}
                    todoListId={props.todoListId}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />
            )
        }
    )

    const filterButtons = (val: FilterTasksType) => {
        props.filterTasks(val, props.todoListId)
    }
    //

    //Callback To addTask
    const addTask = useCallback((text: string) => {
        props.addTask(text, props.todoListId)
    }, [props.addTask, props.todoListId])

    const changeToDoListTitleCallback = useCallback((toDoListTitle: string) => {
        props.changeTodolistTitle(toDoListTitle, props.todoListId)
    }, [props.todoListId])

    return (
        <div>
            {/*Task Input*/}
            <IconButton onClick={() => props.remoteTodoLost(props.todoListId)}
                        sx={{
                            margin: "0",
                            padding: "0",
                            position: "relative",
                            left: "230px",
                        }}
            >
                <Clear/>
            </IconButton>

            <div>
                <EditableSpan textStyle={"h6"} title={props.title} callBack={changeToDoListTitleCallback}/>
            </div>


            <AddItemForm addItem={addTask}/>

            {/*Tasks List*/}
            <List>
                {arrayOfTasksLi}
            </List>
            {/*Filter Buttons*/}
            <div>
                <ButtonGroup size={"small"} variant={"outlined"}>
                    <Button
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={() => filterButtons("all")}
                    >
                        All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={() => filterButtons("active")}
                    >
                        Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={() => filterButtons("completed")}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
})

