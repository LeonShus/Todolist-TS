import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";
import {IconButton, List, Paper} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {Task} from "./Tasks/Task";
import {useDispatch} from "react-redux";
import {
    changeTodosTitleTC,
    deleteTodosTC,
    FilterTasksType,
    filterTodoListAC,
} from "../../bll/reducers/TodoListReducer";
import {createTaskTC, setTasksTC, TaskStatuses, TasksType} from "../../bll/reducers/TaskReducer";
import {ButtonFilterLine} from "../DefaultComponent/ButtonFilterLine/ButtonFilterLine";
import {UpdateTaskParamType} from "../../api/todolistApi";
import {RequestStatusType} from "../../bll/reducers/AppReducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterTasksType
    entityStatus: RequestStatusType
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("TODOLIST")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.todoListId))
    }, [dispatch, props.todoListId])

    //Filter tasks
    let tasksToRender = props.tasks
    if (props.filter === "active") {
        tasksToRender = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksToRender = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    //Do Array of jsx Elements TASKS ITEM
    const arrayOfTasksLi = tasksToRender.map(el => {
            //Task Param to Update
            let taskForUpdateParam: UpdateTaskParamType = {
                title: el.title,
                status: el.status,
                priority: el.priority,
                description: el.description,
                deadline: el.deadline,
                completed: el.completed,
                startDate: el.startDate
            }
            return (
                <Task
                    key={el.id}
                    taskId={el.id}
                    status={el.status}
                    title={el.title}
                    todoListId={props.todoListId}
                    taskForUpdateParam={taskForUpdateParam}
                />
            )
        }
    )
    //Filter
    const filteredTasks = useCallback((val: FilterTasksType) => {
        dispatch(filterTodoListAC({filter: val, id: props.todoListId}))
    }, [dispatch, props.todoListId])
    //Callback To addTask
    const addTask = useCallback((title: string) => {
        // dispatch(addTaskAC(text, props.todoListId))
        dispatch(createTaskTC(props.todoListId, title))
    }, [dispatch, props.todoListId])

    //TodoList Title Change
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodosTitleTC(props.todoListId, title))
    }, [dispatch, props.todoListId])

    //Remove TodoList
    const removeTodoList = () => {
        dispatch(deleteTodosTC(props.todoListId))
    }

    return (

        <Paper sx={{padding: "10px 20px 20px 20px"}}>
            {/*RemoveTask*/}
            <IconButton onClick={removeTodoList}
                        sx={{
                            margin: "0",
                            padding: "0",
                            position: "relative",
                            left: "230px",
                        }}
                        disabled={props.entityStatus === "loading"}
            >
                <Clear/>
            </IconButton>
            {/*Title*/}
            <EditableSpan textStyle={"h6"} title={props.title} callBack={changeTodoListTitle}/>

            <AddItemForm addItem={addTask} disabled={props.entityStatus === "loading"}/>
            {/*Tasks List*/}
            <List>
                {arrayOfTasksLi}
            </List>
            {/*Filter Buttons*/}
            <ButtonFilterLine filter={props.filter} filteredTasks={filteredTasks}/>

        </Paper>

    );
})

