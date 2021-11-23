import React, {ChangeEvent} from "react";
import {FilterTasksType, TasksType} from "../../App";
import classes from "./TodoList.module.css"
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";
import {Button, ButtonGroup, IconButton, List, ListItem, Typography} from "@mui/material";
import {Clear, Delete} from "@mui/icons-material";


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
                <ListItem key={el.id}
                          className={`${el.isDone ? classes.isDone : ""}`}
                          disablePadding
                          divider
                          sx={{pl: "16px"}}
                >

                    <input onChange={onChangeHandler}
                           type="checkbox"
                           checked={el.isDone}
                    />
                    <EditableSpan title={el.title} callBack={editableSpanCallBack}/>
                    <IconButton onClick={removeTaskBtn}>
                        <Delete/>
                    </IconButton>
                </ListItem>
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

    const changeToDoListTitleCallback = (toDoListTitle: string) => {
        props.changeTodolistTitle(toDoListTitle, props.id)
    }

    return (
        <div className={classes.container}>
            <IconButton onClick={() => props.remoteTodoLost(props.id)}
                        sx={{
                            margin: '0',
                            padding: '0',
                            position: 'relative',
                            left: '230px',
                            top: '3px'
                        }}
            >
                <Clear/>
            </IconButton>
            <Typography sx={{fontWeight: "bold"}}>
                <EditableSpan textStyle={'h6'} title={props.title} callBack={changeToDoListTitleCallback}/>
            </Typography>


            <AddItemForm addItem={addTaskCallback}/>

            <List>
                {arrayOfTasksLi}
            </List>
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
}

