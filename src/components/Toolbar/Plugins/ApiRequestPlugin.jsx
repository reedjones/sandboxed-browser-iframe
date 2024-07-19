import React from "react";
import { createPlugin } from "@/utils/createPlugin";

const clickHandler = async ({ state, setState }) => {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();

        // Update shared state with the response data
        setState((prevState) => ({
            ...prevState,
            apiData: data,
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const initFunc = ([state, setState]) => {
    // Optionally initialize state if necessary
    console.log("API Request Plugin initialized with state:", state);
};

const ApiRequestPlugin = createPlugin({
    name: "API Request Plugin",
    icon: "FaDownload",
    clickHandler: (props) => clickHandler(props),
    initFunc,
});

export default ApiRequestPlugin;
