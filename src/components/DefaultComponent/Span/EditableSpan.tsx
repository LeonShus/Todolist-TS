import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import classes from "./EditableSpan.module.css"

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = ({title, callBack}: EditableSpanPropsType) => {

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
                ? <span className={classes.spanStyle}
                        onDoubleClick={onEditMode}>{title}</span>
                : <input autoFocus
                         onKeyPress={keyAdd}
                         onChange={changeTitleVal}
                         onBlur={changeItemTitle} type="text"
                         value={titleText}/>
            }


        </>
    )
}

