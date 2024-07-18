import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Resizable } from 're-resizable';
import { X, Minus, Home, Search, Wrench } from 'lucide-react';

const IframeSandbox = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInspectorMode, setIsInspectorMode] = useState(false);

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
  const toggleInspector = () => setIsInspectorMode(!isInspectorMode);

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
              <Button size="icon" variant={isInspectorMode ? "secondary" : "ghost"} onClick={toggleInspector}>
                <Wrench className="h-4 w-4" />
              </Button>
            </div>
            <iframe
              srcDoc={htmlContent}
              sandbox="allow-scripts"
              className="flex-grow w-full"
              title="Sandbox"
            />
          </Card>
        </Resizable>
      )}
    </div>
  );
};

export default IframeSandbox;