import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./reducers/TaskReducer";
import {todoListReducer} from "./reducers/TodoListReducer";
import thunk from 'redux-thunk'
import {appReducer} from "./reducers/AppReducer";
import {authReducer} from "./reducers/AuthReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store