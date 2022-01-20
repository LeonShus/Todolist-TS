import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TodoList} from "./TodoList";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../bll/reducers/TaskReducer";
import {todoListId_01, todoListId_02} from "../../bll/reducers/TaskReducer.test";

export default {
    title: "TODOLISTS/TodoList",
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args}/>

export const TodoListStory = Template.bind({});
TodoListStory.args = {
    title: "WSS",
    todoListId: "2",
    filter: "all",
    tasks: [
        {
            id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: todoListId_01,
            completed: false, addedDate: "", deadline: "", description: "", startDate: "",
            order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_02,
            completed: false, addedDate: "", deadline: "", description: "", startDate: "",
            order: 0, priority: TaskPriorities.Low
        },
    ]
}