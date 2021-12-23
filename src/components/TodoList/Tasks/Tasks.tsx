import React, {ChangeEvent} from "react"
import {Checkbox, IconButton, ListItem} from "@mui/material";
import classes from "../TodoList.module.css";
import {EditableSpan} from "../../DefaultComponent/Span/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC} from "../../../todolistReducer/TaskReducer";

type TasksPropsType = {
    taskId: string
    todoListId: string
    isDone: boolean
    title: string
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTask: (tasksID: string, todoListID: string) => void
}

export const Tasks = (props: TasksPropsType) => {

    const dispatch = useDispatch()
    const removeTaskBtn = () => dispatch(removeTaskAC(props.taskId, props.todoListId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todoListId))
    }

    const editableSpanCallBack = (title: string) => {
        props.changeTaskTitle(props.taskId, title, props.todoListId)
    }
    return (
        <ListItem key={props.taskId}
                  className={`${props.isDone ? classes.isDone : ""}`}
                  disablePadding
                  divider
                  sx={{pl: "16px"}}
        >

            <Checkbox onChange={onChangeHandler}
                      checked={props.isDone}
            />
            <EditableSpan title={props.title} callBack={editableSpanCallBack}/>
            <IconButton onClick={removeTaskBtn}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}