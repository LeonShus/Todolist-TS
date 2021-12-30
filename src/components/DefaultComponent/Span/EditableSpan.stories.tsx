import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: "TODOLISTS/EditableSpan",
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => {
    return (
            <EditableSpan {...args} />
    )
}

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    title: 'wewe',
    textStyle: 'body1',
    callBack: action('Span change')
}