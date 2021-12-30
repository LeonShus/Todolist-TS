import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {TodoList} from "./TodoList";
import {Provider} from "react-redux";
import {store} from "../../bll/store";

export default {
    title: "TODOLISTS/TodoList",
    component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => {
    return (
        <Provider store={store}>
            <TodoList {...args} />
        </Provider>

    )
}

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