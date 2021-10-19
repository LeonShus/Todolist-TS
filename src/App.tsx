import React, {useState} from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterTasksType = 'all' | "active" | "completed"


function App() {

    let [tasks, SetTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "bib", isDone: false},
        {id: 4, title: "bub", isDone: true},
        {id: 5, title: "bob", isDone: false},
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
    const removeTask = (tasksID: number) => {
        SetTasks(tasks.filter(el => el.id !== tasksID))
    }

    return (
        <div className="App">
            <TodoList title="What to buy"
                      tasks={tasksToRender}
                      removeTask={removeTask}
                      filterTasks={filterTasks}/>
        </div>
    );
}

export default App;
