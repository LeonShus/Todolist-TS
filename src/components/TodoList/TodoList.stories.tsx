import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {TodoList} from "./TodoList";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";

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
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "React", isDone: false}
    ]
}