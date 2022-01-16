import React, {ChangeEvent} from "react"
import {Checkbox, IconButton, ListItem} from "@mui/material";
import classes from "../TodoList.module.css";
import {EditableSpan} from "../../DefaultComponent/Span/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {deleteTaskTC, TaskStatuses, upgradeTaskTC} from "../../../bll/reducers/TaskReducer";
import {UpdateTaskParamType} from "../../../api/todolistApi";

type TasksPropsType = {
    taskId: string
    todoListId: string
    status: TaskStatuses
    title: string
    taskForUpdateParam: UpdateTaskParamType
}

export const Task = React.memo((props: TasksPropsType) => {

    const dispatch = useDispatch()

    const removeTask = () => dispatch(deleteTaskTC(props.todoListId, props.taskId))

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let checked = e.currentTarget.checked
        let status = checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(upgradeTaskTC(props.todoListId, props.taskId, {...props.taskForUpdateParam, status}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(upgradeTaskTC(props.todoListId, props.taskId, {...props.taskForUpdateParam, title}))
    }
    return (
        // Task
        <ListItem key={props.taskId}
                  className={`${props.status ? classes.status : ""}`}
                  disablePadding
                  divider
                  sx={{pl: "16px"}}
        >

            <Checkbox onChange={changeTaskStatus}
                      checked={props.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.title} callBack={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})