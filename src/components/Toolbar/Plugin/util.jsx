import React, {useEffect} from "react";
import * as Icons from "react-icons/fa";
import * as LucideIcons from 'lucide-react';

import withSharedState from "@/components/Toolbar/WithSharedState.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


/* Your icon name from database data can now be passed as prop */
export const DynamicFaIcon = ({ name }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) { // Return a default one
        return <Icons.FaNotEqual/>;
    }

    return <IconComponent />;
};

export const libraries = {
    "react":Icons,
    "lucide":LucideIcons
}

export const AppIcon = ({library, name}) => {
    if (library in libraries){

        const IconComponent = libraries[library][name]
        if (!IconComponent) { return <i>{library}:{name}</i> }
        return <IconComponent />;
    }
    else {
        throw new Error(`${library} not supported`);
    }

}

export const createPlugin2 = ({ name, icon, clickHandler, initFunc, iconLib }) => {
    // eslint-disable-next-line no-unused-vars
    const PluginComponent = ({ state, setState }) => {
        const handleClick = () => clickHandler({ state, setState });

        return (
            <button onClick={handleClick}>
                <Tooltip>
                    <TooltipTrigger><AppIcon name={icon} library={iconLib} /></TooltipTrigger>
                    <TooltipContent>{name}</TooltipContent>
                </Tooltip>
               {name}
            </button>
        );
    };

    return withSharedState(PluginComponent, initFunc);
};

export const createPlugin = ({ name, icon, clickHandler, initFunc }) => {
    // eslint-disable-next-line no-unused-vars
    const PluginComponent = ({ state, setState }) => {
        const handleClick = () => clickHandler({ state, setState });

        return (
            <button onClick={handleClick}>
                <DynamicFaIcon name={icon} /> {name}
            </button>
        );
    };

    return withSharedState(PluginComponent, initFunc);
};