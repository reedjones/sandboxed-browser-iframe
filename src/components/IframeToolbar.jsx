import {Button} from "@/components/ui/button.jsx";
import {Home, Minus, X} from "lucide-react";
import React from "react";

export function IframeToolbar() {
    return <div className="flex space-x-2">
        <Button size="icon" variant="ghost">
            <X className="h-4 w-4"/>
        </Button>
        <Button size="icon" variant="ghost">
            <Minus className="h-4 w-4"/>
        </Button>
        <Button size="icon" variant="ghost">
            <Home className="h-4 w-4"/>
        </Button>
    </div>;
}

IframeToolbar.propTypes = {

};

export default IframeToolbar;