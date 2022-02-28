import React, {useEffect} from "react";
import "./App.css";
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {Header} from "./components/Header/Header";
import {RequestStatusType} from "./bll/reducers/AppReducer";
import {ErrorSnackbar} from "./components/DefaultComponent/ErrorSnackbar/errorSnackBar";
import {Login} from "./features/login/login";
import {Navigate, Route, Routes} from "react-router-dom";
import {authMe} from "./bll/reducers/AuthReducer";
import { TodoLists } from "./components/TodoLists/TodoLists";


export const AppWithRedux = () => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    //Loading bar
    const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)


    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <LinearProgress/>
        </div>
    }

    return (
        <>
            {/*Header*/}
            <Header/>

            {loadingStatus === "loading" && <LinearProgress/>}

            <Routes>
                <Route path={"/"} element={<Navigate to={"/login"}/>}/>
                <Route path={"to-do-lists"} element={<TodoLists/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={"/404"}/>}/>
            </Routes>

            <ErrorSnackbar/>
        </>
    );
}

