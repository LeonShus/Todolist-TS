import React, {useState} from "react";
import "./App.css";
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/DefaultComponent/Input/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

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

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "Want to sell", filter: "all"},
        {id: todoListID_2, title: "Want to buy", filter: "all"},
    ])
    let [tasks, SetTasks] = useState<TasksStateType>({
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
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter} : el))
    }

    //Delete Task
    const removeTask = (tasksID: string, todoListID: string) => {
        SetTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== tasksID)})
    }

    //AddTask
    const addTask = (title: string, todoListID: string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        if (title) {
            SetTasks({
                ...tasks,
                [todoListID]: [newTask, ...tasks[todoListID]]
            })
        }

    }
    //Change
    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        SetTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === id ? {...el, isDone} : el)
        })
    }

    //Remote TodoList
    const remoteTodoLost = (todoListID: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title} : el))
    }

    //Change Title of Task
    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        SetTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, title} : el)
        })
    }


    //AddToDoList
    const addToDoList = (title: string) => {
        const newToDoList: TodoListType = {
            id: v1(),
            title,
            filter: "all"
        }
        setTodoLists([...todoLists, newToDoList])
        SetTasks({...tasks, [newToDoList.id]: []})
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
            {/*Main*/}
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

