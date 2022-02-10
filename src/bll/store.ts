import {combineReducers} from "redux";
import {tasksReducer} from "./reducers/TaskReducer";
import {todoListReducer} from "./reducers/TodoListReducer";
import thunk from "redux-thunk"
import {appReducer} from "./reducers/AppReducer";
import {authReducer} from "./reducers/AuthReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)

})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store