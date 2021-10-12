import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let tasks_1 : Array<TasksType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true}
    ]
    let tasks_2 : Array<TasksType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true}
    ]
    let tasks_3 : Array<TasksType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true}
    ]
    return (
        <div className="App">
            <TodoList title='What to buy' tasks={tasks_1}/>
            <TodoList title='What to learn' tasks={tasks_2}/>
            <TodoList title='What to eat' tasks={tasks_3}/>
        </div>
    );
}

export default App;
