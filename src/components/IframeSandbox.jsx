import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Resizable} from 're-resizable';
import {Home, Minus, Search, Wrench, X} from 'lucide-react';
import {Badge} from "@/components/ui/badge";
import {ScrollArea} from "@/components/ui/scroll-area";
import InspectedElementPanel from "@/components/InspectedElementPanel.jsx";


const add_script = (doc, context_name, chan) => {
    let c = chan || "test_channel"
    console.log(`adding script to doc ${context_name}`)
    let s = doc.createElement("script")
    s.text = ` 
    alert('hi');
    const bc = new BroadcastChannel("${c}");
    bc.postMessage("This is a test message - from (${context_name})");
    bc.onmessage = (event) => {
    const msg = " (${context_name}) got event, from channel: ${c}"
    console.log(msg);
      console.log(event);
      const event_data = { "e":event, "msg":msg};
      const evt = new Event("sync-frame-time");
      window.top.dispatchEvent(
      new CustomEvent("sync-frame-time", {
        bubbles: true,
        detail:  event_data ,
      }))
    };
    `;
    doc.body.appendChild(
        s
    )
    return doc
}



const IframeSandbox = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [isInspectorMode, setIsInspectorMode] = useState(false);
    const [inspectedElement, setInspectedElement] = useState(null);
    const iframeRef = useRef(null);
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState("");

    const channel = new BroadcastChannel("test_channel");

    const startTimer = useCallback(delay => {
        setTimeout(() => {
            setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }, delay);
    }, []);

    const syncItUp = () => {
        const timeNow = new Date().getTime();
        channel.postMessage(timeNow);
        setStatus(`Sent "sync" message`);
        startTimer(2000);
    };

    useEffect(() => {
        window.addEventListener('sync-frame-time', (event) => {
            console.log('sync frame event', event);
        });

        return () => {
            window.removeEventListener('sync-frame-time', (event) => {
                console.log('sync frame event', event);
            });
        };
    }, []);

    useEffect(() => {
        channel.onmessage = ev => {
            console.log(ev);
            const timeNow = new Date().getTime();
            setStatus(`Received "sync" message`);
            startTimer(2000 - (timeNow - ev.data));
        };

        return () => {
            channel.close();
        };
    }, [channel, startTimer]);

    const processHtml = (content) => {
        const parser = new DOMParser();
        let doc = parser.parseFromString(content, "text/html");
        const doc2 = add_script(doc, 'added-iframe');
        const xml = new XMLSerializer();
        const html = xml.serializeToString(doc2);
        const escapedXmlString = html.replace(/=&gt;/g, '=>');
        setHtmlContent(escapedXmlString);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = (e) => processHtml(e.target.result);
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
    };

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.contentWindow.postMessage({type: 'INITIALIZE', state: {time, status}}, '*');
        }

        const handleMessage = (event) => {
            if (event.data && event.data.type === 'STATE_UPDATE') {
                const {state} = event.data;
                setTime(state.time);
                setStatus(state.status);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [time, status]);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && isInspectorMode) {
            const handleMouseOver = (event) => {
                event.source.postMessage({type: 'HIGHLIGHT_ELEMENT', target: event.data.target}, '*');
            };

            const handleMouseOut = (event) => {
                event.source.postMessage({type: 'REMOVE_HIGHLIGHT', target: event.data.target}, '*');
            };

            const handleClick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                setInspectedElement(event.data);
            };

            window.addEventListener('message', handleMouseOver);
            window.addEventListener('message', handleMouseOut);
            window.addEventListener('message', handleClick);

            return () => {
                window.removeEventListener('message', handleMouseOver);
                window.removeEventListener('message', handleMouseOut);
                window.removeEventListener('message', handleClick);
            };
        }
    }, [isInspectorMode]);

    return (
        <>
            <div>
                <button className="btn" onClick={syncItUp}>
                    Sync It Up!
                </button>
                <div>{status}</div>
                {status && time === 0 ? <div className="timer">Starting...</div> : null}
                {time > 0 ? <div className="timer">{time}</div> : null}
            </div>

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
                                        <X className="h-4 w-4"/>
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={handleMinimize}>
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={handleHome}>
                                        <Home className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <div className="flex-grow mx-4">
                                    <div className="relative">
                                        <Search
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                        <Input
                                            type="text"
                                            placeholder="Search"
                                            className="pl-8 pr-4 py-1 w-full"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type={"button"}
                                    size="icon"
                                    variant={isInspectorMode ? "secondary" : "ghost"}
                                    onClick={toggleInspector}
                                >
                                    <Wrench className="h-4 w-4"/>
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
                                    sandbox="allow-scripts allow-modals"
                                    className="flex-grow w-full"
                                    title="Sandbox"
                                />
                                {isInspectorMode && inspectedElement && (
                                    <InspectedElementPanel
                                        inspectedElement={inspectedElement}></InspectedElementPanel>
                                )}
                            </div>
                        </Card>
                    </Resizable>
                )}
            </div>
        </>
    );
};

export default IframeSandbox;
