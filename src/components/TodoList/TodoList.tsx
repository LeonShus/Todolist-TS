import React from 'react';
import {FilterTasksType, TasksType} from "../../App";


type TodoListPropsType = {
    title:string
    tasks: Array<TasksType>
    removeTask: (tasksID: number) => void
    filterTasks: (filter : FilterTasksType) => void
}

function TodoList(props: TodoListPropsType) {
    console.log(props, 'TodoList')
    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}>x</button>
                        </li>
                    )}
                )}
            </ul>
            <div>
                <button onClick={() => props.filterTasks("all")}>All</button>
                <button onClick={() => props.filterTasks("active")}>Active</button>
                <button onClick={() => props.filterTasks("completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
