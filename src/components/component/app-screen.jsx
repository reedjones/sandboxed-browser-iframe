/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/dn7WuiN4L5q
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

export function AppScreen() {
  return (
    (<div className="flex h-screen w-full flex-col">
      <header
        className="flex items-center justify-between bg-background px-4 py-2 shadow">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MinimizeIcon className="h-5 w-5" />
            <span className="sr-only">Minimize</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HomeIcon className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Button>
        </div>
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-2 flex items-center">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-muted pl-8 pr-4 focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Maximize2Icon className="h-5 w-5" />
            <span className="sr-only">Fullscreen</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ZapIcon className="h-5 w-5" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <InspectionPanelIcon className="h-5 w-5" />
            <span className="sr-only">Inspect</span>
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full max-w-full rounded-none border-0">
          <ResizablePanel defaultSize={80}>
            <div className="flex h-full flex-col items-center justify-center bg-muted p-4">
              <div className="flex flex-col items-center gap-4">
                <CodeIcon className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">HTML Sandbox</h3>
                <p className="text-center text-muted-foreground">
                  Drag and drop your HTML file or paste your code to preview it in the iframe.
                </p>
                <Button variant="outline" className="w-full">
                  Upload HTML
                </Button>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20}>
            <iframe src="data:text/html;charset=utf-8," className="h-full w-full" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>)
  );
}

function CodeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function InspectionPanelIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 7h.01" />
      <path d="M17 7h.01" />
      <path d="M7 17h.01" />
      <path d="M17 17h.01" />
    </svg>)
  );
}


function Maximize2Icon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" x2="14" y1="3" y2="10" />
      <line x1="3" x2="10" y1="21" y2="14" />
    </svg>)
  );
}


function MinimizeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}


function ZapIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>)
  );
}
