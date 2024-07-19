import ToolbarComponent from "@/components/Toolbar/ToolbarComponent.jsx";
import React from "react";
import {InspectPlugin, ResizePlugin} from "@/components/FrameToolbar/Actions.jsx";

const FrameToolbar = () => {
    /*
    * (toolbar)
(panel group (Panel collection panel, [] hover panel, [] selected panel, [] template panel, [] info panel)),
(input group ((Button file (upload file input)) or (+ url (enter url input)))),
(action group (+ resize, + inspect)),
    * */
    const groups = [{
        ariaLabel: "Input",
        plugins: [InspectPlugin, ResizePlugin],
        separator: true
    },
        {
            ariaLabel: "Actions",
            plugins: [],
            separator: true
        },
        {
            ariaLabel: "Panels",
            plugins: [],

        }
    ]
    return (

        <div className="flex space-x-2">
            <h1>Toolbar with Plugin Groups</h1>
            <ToolbarComponent groups={groups} direction={"horizontal"}/>
        </div>
    );
}

export default FrameToolbar;
