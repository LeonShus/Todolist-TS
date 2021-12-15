import React from "react";
import "./App.css";
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/DefaultComponent/Input/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodoListTitleAC,
    filterTodoListAC,
    removeTodoListAC
} from "./todolistReducer/TodoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./todolistReducer/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTasksType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export const AppWithRedux = () => {

    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    //FilteredVal
    const filterTasks = (filter: FilterTasksType, todoListID: string) => {
        dispatch(filterTodoListAC(filter, todoListID))
    }

    //Delete Task
    const removeTask = (tasksID: string, todoListID: string) => {
        dispatch(removeTaskAC(tasksID, todoListID))
    }

    //AddTask
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))

    }
    //Change
    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))
    }

    //Remote TodoList
    const remoteTodoLost = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }

    //Change Title of Task
    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }


    //AddToDoList
    const addToDoList = (title: string) => {
        const newId = v1()
        dispatch(addTodolistAC(title, newId))
    }


    const todoListComponents = todoLists.map(tl => {
        //Filter tasks to UI
        let tasksToRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksToRender = tasks[tl.id].filter(el => !el.isDone)
        }
        if (tl.filter === "completed") {
            tasksToRender = tasks[tl.id].filter(el => el.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper sx={{padding: "10px 20px 20px 20px"}}>
                    <TodoList id={tl.id}
                              title={tl.title}
                              tasks={tasksToRender}
                              addTask={addTask}
                              removeTask={removeTask}
                              filterTasks={filterTasks}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              remoteTodoLost={remoteTodoLost}
                              changeTodolistTitle={changeTodolistTitle}
                              changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <>
            {/*Header*/}
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit"
                            variant={"outlined"}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            {/*Skills*/}
            <Container fixed>
                <Grid container sx={{padding: "10px 0 10px "}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                {/*TodoLists*/}
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </>
    );
}

