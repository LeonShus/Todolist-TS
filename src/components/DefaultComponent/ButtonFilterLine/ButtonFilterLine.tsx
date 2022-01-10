import React from "react";
import {Button, ButtonGroup} from "@mui/material";
import {FilterTasksType} from "../../../bll/reducers/TodoListReducer";


type ButtonFilterLine = {
    filter: FilterTasksType
    filteredTasks: (val: FilterTasksType) => void
}

export const ButtonFilterLine = React.memo(({filter, filteredTasks}: ButtonFilterLine) => {
    console.log("ButtonFilterLine")

    return (

        <ButtonGroup size={"small"} variant={"outlined"}>
            <Button
                color={filter === "all" ? "secondary" : "primary"}
                onClick={() => filteredTasks("all")}
            >
                All
            </Button>
            <Button
                color={filter === "active" ? "secondary" : "primary"}
                onClick={() => filteredTasks("active")}
            >
                Active
            </Button>
            <Button
                color={filter === "completed" ? "secondary" : "primary"}
                onClick={() => filteredTasks("completed")}
            >
                Completed
            </Button>
        </ButtonGroup>
    );
})
