import React, {useCallback, useEffect} from "react";
import "./App.css";
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/DefaultComponent/Input/AddItemForm";
import {Container, Grid, LinearProgress} from "@mui/material";
import {createTodosTC, setTodosTC, TodoListDomainType} from "./bll/reducers/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {Header} from "./components/Header/Header";
import {TasksStateType} from "./bll/reducers/TaskReducer";
import {RequestStatusType} from "./bll/reducers/AppReducer";
import {ErrorSnackbar} from "./components/DefaultComponent/ErrorSnackbar/errorSnackBar";


export const AppWithRedux = () => {

    const dispatch = useDispatch()
    //Get data from state
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //AddToDoList
    const addToDoList = useCallback((title: string) => {
        dispatch(createTodosTC(title))
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

    useEffect(() => {
        dispatch(setTodosTC())
    }, [dispatch])


    //less15
    const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    console.log(loadingStatus)


    return (
        <>
            {/*Header*/}
            <Header/>

            {loadingStatus === "loading" && <LinearProgress/>}


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


            <ErrorSnackbar/>
        </>
    );
}

