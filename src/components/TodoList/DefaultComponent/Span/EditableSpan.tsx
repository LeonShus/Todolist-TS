import React, {ChangeEvent, useState} from "react"

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

    const onBlurHandler = () => {
        callBack(titleText)
        offEditMode()
    }

    return (
        <>
            {!editMode
                ? <span onDoubleClick={onEditMode}>{title}</span>
                : <input autoFocus onChange={changeTitleVal} onBlur={onBlurHandler} type="text" value={titleText}/>
            }


        </>
    )
}