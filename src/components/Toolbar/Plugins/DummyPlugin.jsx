import React from "react";
import { createPlugin } from "../Plugin/util";

const clickHandler = () => {
    console.log("Plugin clicked");
};

const initFunc = ([state, setState]) => {
    console.log("Initialized with state:", state);
};

const DummyPlugin = createPlugin({
    name: "Example Plugin",
    icon: "FaBeer",
    clickHandler,
    initFunc,
});

export default DummyPlugin;
