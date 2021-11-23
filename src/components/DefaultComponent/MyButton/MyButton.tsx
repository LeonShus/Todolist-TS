import React from "react";

type ButtonType ={
    name: string
    callback: () => void
    style?: string
}

export const MyButton = ({name, callback, style}: ButtonType) => {

    const onClickHandler = () => {
        callback()
    }

    return(
        <button className={style} onClick={onClickHandler}>{name}</button>
    )
}