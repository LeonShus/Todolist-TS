import React, {useCallback} from "react";
import {FilterTasksType, TasksType} from "../../AppWithRedux";
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {EditableSpan} from "../DefaultComponent/Span/EditableSpan";
import {Button, ButtonGroup, IconButton, List, Paper} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {Task} from "./Tasks/Tasks";
import {useDispatch} from "react-redux";
import {changeTodoListTitleAC, filterTodoListAC, removeTodoListAC} from "../../todolistReducer/TodoListReducer";
import {addTaskAC} from "../../todolistReducer/TaskReducer";


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
    const filteredTasks = (val: FilterTasksType) => {
        dispatch(filterTodoListAC(val, props.todoListId))
    }
    //Callback To addTask
    const addTask = useCallback((text: string) => {
        dispatch(addTaskAC(text, props.todoListId))
    },[dispatch, props.todoListId])

    //TodoList Title Change
    const changeTodoListTitle = useCallback((toDoListTitle: string) => {
        dispatch(changeTodoListTitleAC(toDoListTitle, props.todoListId))
    },[dispatch, props.todoListId])

    //Remove TodoList
    const removeTodoList = () => {
        dispatch(removeTodoListAC(props.todoListId))
    }

    return (

        <Paper sx={{padding: "10px 20px 20px 20px"}}>
            {/*Task Input*/}
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

            <div>
                <EditableSpan textStyle={"h6"} title={props.title} callBack={changeTodoListTitle}/>
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
                        onClick={() => filteredTasks("all")}
                    >
                        All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={() => filteredTasks("active")}
                    >
                        Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={() => filteredTasks("completed")}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </Paper>

    );
})

