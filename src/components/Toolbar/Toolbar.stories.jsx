import React from 'react';
import ToolbarComponent from './ToolbarComponent';
import SavePlugin from './Plugins/SavePlugin';
import LoadPlugin from './Plugins/LoadPlugin';
import {fn} from "@storybook/test";



const ToolbarStory = ({direction}) => {
    const groups = [
        {
            ariaLabel: 'File Operations',
            plugins: [SavePlugin, LoadPlugin],
            separator: true,
        },
        {
            ariaLabel: 'Other Tools',
            plugins: [],
            separator: false,
        },
    ];

    return (
        <div>
            <h1>Toolbar with Plugin Groups</h1>
            <ToolbarComponent groups={groups} direction={direction}/>
        </div>
    );
};



export default {
    title: 'Toolbar',
    component: ToolbarStory,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        direction : {options: ['vertical', 'horizontal'],}
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { direction:"horizontal" },
};

export const Horizontal =  {
    args: {
        direction:"horizontal"
    }
}

export const Vertical =  {
    args: {
        direction:"vertical"
    }
}
