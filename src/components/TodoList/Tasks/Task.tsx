import React from "react"
import {Checkbox, IconButton, ListItem} from "@mui/material";
import classes from "../TodoList.module.css";
import {EditableSpan} from "../../DefaultComponent/Span/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStatuses} from "../../../bll/reducers/TaskReducer";

type TasksPropsType = {
    taskId: string
    todoListId: string
    status: TaskStatuses
    title: string
}

export const Task = React.memo((props: TasksPropsType) => {

    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.taskId, props.todoListId))

    const changeTaskStatusToCompleted = () => {
        dispatch(changeTaskStatusAC(props.taskId, TaskStatuses.Completed, props.todoListId))
    }
    const changeTaskStatusToNew = () => {
        dispatch(changeTaskStatusAC(props.taskId, TaskStatuses.New, props.todoListId))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.taskId, title, props.todoListId))
    }
    return (
        // Task
        <ListItem key={props.taskId}
                  className={`${props.status ? classes.status : ""}`}
                  disablePadding
                  divider
                  sx={{pl: "16px"}}
        >

            <Checkbox onChange={props.status === TaskStatuses.New
                ? changeTaskStatusToCompleted
                : changeTaskStatusToNew}
                      checked={props.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.title} callBack={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})