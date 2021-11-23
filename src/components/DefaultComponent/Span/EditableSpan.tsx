import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import classes from "./EditableSpan.module.css"
import {TextField, Typography} from "@mui/material";

type textStyleType =
    "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit"
    | undefined

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
    textStyle?: textStyleType
}

export const EditableSpan = ({title, callBack, textStyle}: EditableSpanPropsType) => {

    let [titleText, setTitleText] = useState<string>(title)
    const changeTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleText(e.currentTarget.value)
    }
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)

    const changeItemTitle = () => {
        callBack(titleText)
        offEditMode()
    }
    const keyAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            changeItemTitle()
        }
    }
    return (
        <>
            {!editMode
                ? <Typography
                    variant={textStyle}
                    className={classes.spanStyle}
                    onDoubleClick={onEditMode}
                    sx={{flexGrow: 1}}
                >
                    {title}
                </Typography>
                : <TextField autoFocus
                             variant={"standard"}
                             onKeyPress={keyAdd}
                             onChange={changeTitleVal}
                             onBlur={changeItemTitle} type="text"
                             value={titleText}/>
            }


        </>
    )
}

