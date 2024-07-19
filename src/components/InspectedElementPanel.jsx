import React from "react";
import PropTypes from "prop-types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const InspectedElementPanel = ({ inspectedElement }) => {
    const myRender = () => {
        if(inspectedElement) {
            return (
                <Card className="w-1/3 p-4 overflow-auto">
                    <h3 className="text-lg font-semibold mb-2">Inspected Element</h3>
                    <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                            <p>
                                <strong>Tag:</strong> {inspectedElement?.tagName}
                            </p>
                            <p>
                                <strong>ID:</strong> {inspectedElement?.id || "None"}
                            </p>
                            <p>
                                <strong>Classes:</strong> {inspectedElement?.className || "None"}
                            </p>
                            <div>
                                <strong>Attributes:</strong>
                                <ul className="list-disc pl-5">
                                    {inspectedElement?.attributes &&
                                        Array.from(inspectedElement.attributes).map((attr, index) => (
                                            <li key={index}>
                                                {attr.name}: {attr.value}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollArea>
                </Card>
            )
        } else {
            return (
                <Card className="w-1/3 p-4 overflow-auto">
                    <h5>Not inspecting</h5>
                </Card>
            )
        }
    }
    return (
        myRender()
    );
};

InspectedElementPanel.propTypes = {
    inspectedElement: PropTypes.shape({
        tagName: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        attributes: PropTypes.object,
    }),
};

export default InspectedElementPanel;