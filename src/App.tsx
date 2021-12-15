import React, {useReducer, useState} from "react";
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
    removeTodoListAC,
    todoListReducer
} from "./todolistReducer/TodoListReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./todolistReducer/TaskReducer";

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

export const App = () => {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListReducer,[
        {id: todoListID_1, title: "Want to sell", filter: "all"},
        {id: todoListID_2, title: "Want to buy", filter: "all"},
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID_1]:
            [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "bib", isDone: false},
                {id: v1(), title: "bob", isDone: false},
            ],
        [todoListID_2]:
            [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "bib", isDone: false},
                {id: v1(), title: "bob", isDone: false},
            ]
    })


    //FilteredVal
    const filterTasks = (filter: FilterTasksType, todoListID: string) => {
        dispatchToTodoLists(filterTodoListAC(filter, todoListID))
    }

    //Delete Task
    const removeTask = (tasksID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(tasksID, todoListID))
    }

    //AddTask
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))

    }
    //Change
    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))
    }

    //Remote TodoList
    const remoteTodoLost = (todoListID: string) => {
        dispatchToTodoLists(removeTodoListAC(todoListID))
        dispatchToTasks(removeTodoListAC(todoListID))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
    }

    //Change Title of Task
    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID))
    }


    //AddToDoList
    const addToDoList = (title: string) => {
        const newId = v1()
        dispatchToTodoLists(addTodolistAC(title, newId))
        dispatchToTasks(addTodolistAC(title, newId))
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

