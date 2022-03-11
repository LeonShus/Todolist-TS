import React from "react"
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../bll/reducers/AuthReducer";
import {AppRootStateType} from "../../bll/store";

export const Header = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
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

                {isLoggedIn
                    ? <Button color="inherit"
                              variant={"outlined"}
                              onClick={logOutHandler}
                    >
                        LogOut
                    </Button>
                    : <Button color="inherit"
                              variant={"outlined"}
                    >
                        Login
                    </Button>
                }


            </Toolbar>
        </AppBar>
    )
}