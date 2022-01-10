import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {Provider} from "react-redux";
import {store} from "../../../bll/store";
import {TaskStatuses} from "../../../bll/reducers/TaskReducer";

export default {
    title: "TODOLISTS/Task",
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    return (
        <Provider store={store}>
            <Task {...args} />
        </Provider>

    )
}

export const TaskStory = Template.bind({});
TaskStory.args = {
    taskId: "1",
    title: "buy",
    todoListId: "2",
    status: TaskStatuses.New
}