import React, {useEffect} from "react";
import * as Icons from "react-icons/fa";
import withSharedState from "@/components/Toolbar/WithSharedState.jsx";

/* Your icon name from database data can now be passed as prop */
export const DynamicFaIcon = ({ name }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) { // Return a default one
        return <Icons.FaNotEqual/>;
    }

    return <IconComponent />;
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