import React from 'react';
import { Group } from 'react-aria-components';

const ToolbarGroup = ({ ariaLabel, plugins }) => {
    return (
        <Group aria-label={ariaLabel}>
            {plugins.map((Plugin, index) => (
                <Plugin key={index} />
            ))}
        </Group>
    );
};

export default ToolbarGroup;
