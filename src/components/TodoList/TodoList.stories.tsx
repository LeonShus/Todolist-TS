import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {TodoList} from "./TodoList";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {todoListId_01} from "../../bll/reducers/TodoListReducer";
import {TaskPriorities, TaskStatuses} from "../../bll/reducers/TaskReducer";

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
            id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todoListId_01,
            completed: false, addedDate: "", deadline: "", description: "", startDate: "",
            order: 0, priority: TaskPriorities.Low
        },
    ]
}