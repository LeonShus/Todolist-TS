import React, {useCallback} from "react";
import {FilterTasksType, TasksType} from "../../AppWithRedux";
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";
import {IconButton, List, Paper} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {Task} from "./Tasks/Tasks";
import {useDispatch} from "react-redux";
import {changeTodoListTitleAC, filterTodoListAC, removeTodoListAC} from "../../todolistReducer/TodoListReducer";
import {addTaskAC} from "../../todolistReducer/TaskReducer";
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

    //Filter tasks
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
                <Task
                    key={el.id}
                    taskId={el.id}
                    isDone={el.isDone}
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
    const changeTodoListTitle = useCallback((toDoListTitle: string) => {
        dispatch(changeTodoListTitleAC(toDoListTitle, props.todoListId))
    }, [dispatch, props.todoListId])

    //Remove TodoList
    const removeTodoList = () => {
        dispatch(removeTodoListAC(props.todoListId))
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

