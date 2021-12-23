import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import classes from './AddItemForm.module.css'
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [newTitleText, setNewTitleText] = useState<string>("")
    let [errorFil, setErrorFil] = useState("")

    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleText(e.currentTarget.value)
        setErrorFil("")
    }

    const addItem = () => {
        if (newTitleText.trim()) {
            props.addItem(newTitleText.trim())
            setNewTitleText("")
            setErrorFil("")
        } else {
            setErrorFil("Incorrect value")
            return
        }
    }

    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div className={classes.cont}>
            <TextField variant={"standard"}
                       onKeyPress={keyAdd}
                       onChange={changeTitleVal}
                       value={newTitleText}
                       error={!!errorFil}
                       helperText={errorFil}
                       sx={{ minWidth: "198px"}}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <Add/>
            </IconButton>
        </div>
    )
})