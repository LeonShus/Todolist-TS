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
import {addTaskAC, setTasksTC, TaskStatuses, TasksType} from "../../bll/reducers/TaskReducer";
import {ButtonFilterLine} from "../DefaultComponent/ButtonFilterLine/ButtonFilterLine";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterTasksType
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
            return (
                <Task
                    key={el.id}
                    taskId={el.id}
                    status={el.status}
                    title={el.title}
                    todoListId={props.todoListId}
                />
            )
        }
    )
    //Filter
    const filteredTasks = useCallback((val: FilterTasksType) => {
        dispatch(filterTodoListAC(val, props.todoListId))
    }, [dispatch, props.todoListId])
    //Callback To addTask
    const addTask = useCallback((text: string) => {
        dispatch(addTaskAC(text, props.todoListId))
    }, [dispatch, props.todoListId])

    //TodoList Title Change
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodosTitleTC(props.todoListId, title))
    }, [dispatch])

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
            >
                <Clear/>
            </IconButton>
            {/*Title*/}
            <EditableSpan textStyle={"h6"} title={props.title} callBack={changeTodoListTitle}/>

            <AddItemForm addItem={addTask}/>
            {/*Tasks List*/}
            <List>
                {arrayOfTasksLi}
            </List>
            {/*Filter Buttons*/}
            <ButtonFilterLine filter={props.filter} filteredTasks={filteredTasks}/>

        </Paper>

    );
})

