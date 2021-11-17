import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button} from "../Button/Button";
import classes from "./AddItemForm.module.css"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [newTitleText, setNewTitleText] = useState<string>("")
    let [error, setError] = useState("")

    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleText(e.currentTarget.value)
        setError("")
    }

    const addItem = () => {
        if (newTitleText.trim()) {
            props.addItem(newTitleText.trim())
            setNewTitleText("")
            setError("")
        } else {
            setError("Incorrect value")
            return
        }
    }

    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <input className={error ? classes.errorInp : ""}
                   onKeyPress={keyAdd}
                   onChange={changeTitleVal}
                   value={newTitleText}
                   placeholder={"Enter your task"}
            />
            <Button name="+" callback={addItem}/>
            {error && <div className={classes.error}>{error}</div>}
        </div>
    )
}