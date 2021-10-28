import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { v1 } from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTasksType = 'all' | "active" | "completed"


export const App = () => {

    let [tasks, SetTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "bib", isDone: false},
        {id: v1(), title: "bub", isDone: true},
        {id: v1(), title: "bob", isDone: false},
    ])

    //Filter tasks to render
    let [filter, SetFilter] = useState<FilterTasksType>("all")
    let tasksToRender = tasks

    if (filter === "active"){
        tasksToRender = tasks.filter(el => el.isDone === false)
    }
    if (filter === "completed"){
        tasksToRender = tasks.filter(el => el.isDone === true)
    }
    //Filtered
    const filterTasks = (filter: FilterTasksType) => {
        SetFilter(filter)
    }

    //Delete Task
    const removeTask = (tasksID: string) => {
        SetTasks(tasks.filter(el => el.id !== tasksID))
    }

    const addTask = (e: string) => {
        const newTask : TasksType = {
            id: v1(),
            title: e,
            isDone: false
        }
        if(e){
            SetTasks([newTask, ...tasks])
        }

    }

    const checkChange = (e: string) => {
        SetTasks(tasks.map(el => {
            if(el.id === e){
                el.isDone = !el.isDone
            }
            return el
        }))
    }

    return (
        <div className="App">
            <TodoList title="What to buy"
                      tasks={tasksToRender}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
                      addTask={addTask}
                      checkChange={checkChange}
            />
        </div>
    );
}

