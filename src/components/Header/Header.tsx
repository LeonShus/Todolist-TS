import React from "react"
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export const Header = () => {
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
                <Button color="inherit"
                        variant={"outlined"}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    )
}