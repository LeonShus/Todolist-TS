import React, {useCallback} from "react";
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
import {addTaskAC} from "./todolistReducer/TaskReducer";
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
    const filterTasks = useCallback((filter: FilterTasksType, todoListID: string) => {
        dispatch(filterTodoListAC(filter, todoListID))
    }, [dispatch])
    //AddTask
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))

    }, [dispatch])


    //AddToDoList
    const addToDoList = useCallback((title: string) => {
        const newId = v1()
        dispatch(addTodolistAC(title, newId))
    }, [dispatch])
    //Remote TodoList
    const remoteTodoLost = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    //Change Title
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper sx={{padding: "10px 20px 20px 20px"}}>
                    <TodoList todoListId={tl.id}
                              title={tl.title}
                              tasks={tasks[tl.id]}
                              addTask={addTask}
                              filterTasks={filterTasks}
                              filter={tl.filter}
                              remoteTodoLost={remoteTodoLost}
                              changeTodolistTitle={changeTodolistTitle}

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
                    <Typography variant="h6" component={"span"}>
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
                {/*Add TodoList*/}
                <Grid container sx={{padding: "10px 0 10px "}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                {/*TodoLists + Tasks*/}
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </>
    );
}

