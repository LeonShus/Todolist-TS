import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TasksStateType} from "../../bll/reducers/TaskReducer";
import {createTodosTC, setTodosTC, TodoListDomainType} from "../../bll/reducers/TodoListReducer";
import {AppRootStateType} from "../../bll/store";
// import {RequestStatusType} from "../../bll/reducers/AppReducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../DefaultComponent/Input/AddItemForm";
import {Container} from "@mui/material";
import {TodoList} from "../TodoList/TodoList";
import {Navigate} from "react-router-dom";


export const TodoLists = React.memo(() => {

    const dispatch = useDispatch()
    //Get data from state
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    //AddToDoList
    const addToDoList = useCallback((title: string) => {
        dispatch(createTodosTC(title))
    }, [dispatch])


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <TodoList todoListId={tl.id}
                          entityStatus={tl.entityStatus}
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
    // const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    if (!isLoggedIn) {
        return (
            <Navigate to={"/login"}/>
        )
    }

    return (
        <>
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
})

