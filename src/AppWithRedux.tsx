import React, {useCallback} from "react";
import "./App.css";
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/DefaultComponent/Input/AddItemForm";
import {Container, Grid} from "@mui/material";
import {addTodolistAC} from "./todolistReducer/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {Header} from "./components/Header/Header";

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
    //Get data from state
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    //AddToDoList
    const addToDoList = useCallback((title: string) => {
        const newId = v1()
        dispatch(addTodolistAC(title, newId))
    }, [dispatch])


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <TodoList todoListId={tl.id}
                          title={tl.title}
                          tasks={tasks[tl.id]}
                          filter={tl.filter}
                />
            </Grid>
        )
    })

    return (
        <>
            {/*Header*/}
            <Header/>
            {/*Main*/}
            <Container fixed>
                {/*Add TodoList*/}
                <Grid container sx={{padding: "10px 0 10px "}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                {/*TodoLists*/}
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </>
    );
}
