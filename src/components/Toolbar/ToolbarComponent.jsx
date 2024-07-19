import React from 'react';
import { Toolbar } from 'react-aria-components';
import { SharedStateProvider } from './SharedStateProvider';
import ToolbarGroup from './ToolbarGroup';
import Separator from './Separator';

const ToolbarComponent = ({ groups,direction }) => {
    return (
        <SharedStateProvider>
            <Toolbar aria-label="Tools" orientation={direction}>
                {groups.map((group, index) => (
                    <React.Fragment key={index}>
                        <ToolbarGroup ariaLabel={group.ariaLabel} plugins={group.plugins} />
                        {group.separator && <Separator orientation={direction} />}
                    </React.Fragment>
                ))}
            </Toolbar>
        </SharedStateProvider>
    );
};

export default ToolbarComponent;
