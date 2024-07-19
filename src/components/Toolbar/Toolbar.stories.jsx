import React from 'react';
import ToolbarComponent from './ToolbarComponent';
import SavePlugin from './Plugins/SavePlugin';
import LoadPlugin from './Plugins/LoadPlugin';


const ToolbarStory = () => {
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
            <ToolbarComponent groups={groups} />
        </div>
    );
};

export default ToolbarStory;