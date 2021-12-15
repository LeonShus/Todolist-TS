import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../todolistReducer/TaskReducer";
import {todoListReducer} from "../todolistReducer/TodoListReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store