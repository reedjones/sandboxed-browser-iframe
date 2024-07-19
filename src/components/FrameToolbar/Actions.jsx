import React from "react";
import {createPlugin2} from "@/components/Toolbar/Plugin/index.jsx";


//(action group (+ resize, + inspect)),




const clickHandler = () => {
    console.log("Plugin clicked");
};

const initFunc = ([state, setState]) => {
    console.log("Initialized with state:", state);
};

export const InspectPlugin = createPlugin2({
    name: "Inspect",
    icon: "SquareDashedMousePointer",
    clickHandler,
    initFunc,
    iconLib:"lucide"
});
//<SquareDashedMousePointer />


export const ResizePlugin = createPlugin2({
    name: "Resize",
    icon: "Scaling",
    clickHandler,
    initFunc,
    iconLib:"lucide"
})

