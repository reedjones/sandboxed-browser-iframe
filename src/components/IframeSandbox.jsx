import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Resizable } from 're-resizable';
import { X, Minus, Home, Search, Wrench } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const IframeSandbox = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInspectorMode, setIsInspectorMode] = useState(false);
  const [inspectedElement, setInspectedElement] = useState(null);
  const iframeRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/html') {
      const reader = new FileReader();
      reader.onload = (e) => setHtmlContent(e.target.result);
      reader.readAsText(file);
    } else {
      alert('Please upload an HTML file.');
    }
  };

  const handleClose = () => setHtmlContent('');
  const handleMinimize = () => setIsMinimized(!isMinimized);
  const handleHome = () => {
    // Reset to initial state logic here
  };
  const toggleInspector = () => {
    setIsInspectorMode(!isInspectorMode);
    setInspectedElement(null);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && isInspectorMode) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      
      const highlightElement = (element) => {
        element.style.outline = '2px solid red';
      };

      const removeHighlight = (element) => {
        element.style.outline = '';
      };

      const handleMouseOver = (event) => {
        highlightElement(event.target);
      };

      const handleMouseOut = (event) => {
        removeHighlight(event.target);
      };

      const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setInspectedElement({
          tagName: event.target.tagName,
          id: event.target.id,
          className: event.target.className,
          attributes: Array.from(event.target.attributes).map(attr => ({
            name: attr.name,
            value: attr.value
          }))
        });
      };

      iframeDocument.body.addEventListener('mouseover', handleMouseOver);
      iframeDocument.body.addEventListener('mouseout', handleMouseOut);
      iframeDocument.body.addEventListener('click', handleClick);

      return () => {
        iframeDocument.body.removeEventListener('mouseover', handleMouseOver);
        iframeDocument.body.removeEventListener('mouseout', handleMouseOut);
        iframeDocument.body.removeEventListener('click', handleClick);
      };
    }
  }, [isInspectorMode]);

  return (
    <div className="p-4">
      <Input
        type="file"
        accept=".html"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {htmlContent && (
        <Resizable
          defaultSize={{
            width: '100%',
            height: isMinimized ? 50 : 500,
          }}
          minHeight={50}
        >
          <Card className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleMinimize}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleHome}>
                  <Home className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-grow mx-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-1 w-full"
                  />
                </div>
              </div>
              <Button 
                size="icon" 
                variant={isInspectorMode ? "secondary" : "ghost"} 
                onClick={toggleInspector}
              >
                <Wrench className="h-4 w-4" />
              </Button>
              {isInspectorMode && (
                <Badge variant="outline" className="ml-2">
                  Inspector Active
                </Badge>
              )}
            </div>
            <div className="flex flex-grow">
              <iframe
                ref={iframeRef}
                srcDoc={htmlContent}
                sandbox="allow-scripts"
                className="flex-grow w-full"
                title="Sandbox"
              />
              {isInspectorMode && inspectedElement && (
                <Card className="w-1/3 p-4 overflow-auto">
                  <h3 className="text-lg font-semibold mb-2">Inspected Element</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      <p><strong>Tag:</strong> {inspectedElement.tagName}</p>
                      <p><strong>ID:</strong> {inspectedElement.id || 'None'}</p>
                      <p><strong>Classes:</strong> {inspectedElement.className || 'None'}</p>
                      <div>
                        <strong>Attributes:</strong>
                        <ul className="list-disc pl-5">
                          {inspectedElement.attributes.map((attr, index) => (
                            <li key={index}>{attr.name}: {attr.value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </Card>
              )}
            </div>
          </Card>
        </Resizable>
      )}
    </div>
  );
};

export default IframeSandbox;