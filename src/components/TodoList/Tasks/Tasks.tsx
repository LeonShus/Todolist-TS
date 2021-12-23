import React, {ChangeEvent} from "react"
import {Checkbox, IconButton, ListItem} from "@mui/material";
import classes from "../TodoList.module.css";
import {EditableSpan} from "../../DefaultComponent/Span/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../todolistReducer/TaskReducer";

type TasksPropsType = {
    taskId: string
    todoListId: string
    isDone: boolean
    title: string
}

export const Task = React.memo((props: TasksPropsType) => {

    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.taskId, props.todoListId))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todoListId))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.taskId, title, props.todoListId))
    }
    return (
        // Task
        <ListItem key={props.taskId}
                  className={`${props.isDone ? classes.isDone : ""}`}
                  disablePadding
                  divider
                  sx={{pl: "16px"}}
        >

            <Checkbox onChange={changeTaskStatus}
                      checked={props.isDone}
            />
            <EditableSpan title={props.title} callBack={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})