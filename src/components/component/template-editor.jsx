import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TemplateEditor() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Base Template",
      content: `<!DOCTYPE html>
<html>
  <head>
    <title>{% block title %}{% endblock %}</title>
  </head>
  <body>
    <header>
      <nav>
        {% block navigation %}{% endblock %}
      </nav>
    </header>
    <main>
      {% block content %}{% endblock %}
    </main>
    <footer>
      {% block footer %}{% endblock %}
    </footer>
  </body>
</html>`,
    },
    {
      id: 2,
      name: "Blog Post",
      content: `{% extends 'base.html' %}

{% block title %}{{ post.title }}{% endblock %}

{% block navigation %}
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
{% endblock %}

{% block content %}
  <article>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <p>Posted by {{ post.author }} on {{ post.date }}</p>
  </article>
{% endblock %}

{% block footer %}
  <p>&copy; 2023 My Blog</p>
{% endblock %}`,
    },
  ])
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [replaceWith, setReplaceWith] = useState("")
  const handleTemplateCreate = () => {
    const newTemplate = {
      id: templates.length + 1,
      name: "New Template",
      content: `{% block title %}{% endblock %}

{% block navigation %}{% endblock %}

{% block content %}{% endblock %}

{% block footer %}{% endblock %}`,
    }
    setTemplates([...templates, newTemplate])
    setSelectedTemplate(newTemplate)
  }
  const handleTemplateEdit = (template) => {
    setSelectedTemplate(template)
  }
  const handleTemplateDelete = (template) => {
    setTemplates(templates.filter((t) => t.id !== template.id))
    setSelectedTemplate(templates[0])
  }
  const handleTemplateUpdate = (content) => {
    setSelectedTemplate({ ...selectedTemplate, content })
  }
  const handleSearch = () => {
    const regex = new RegExp(searchTerm, "g")
    const newContent = selectedTemplate.content.replace(regex, replaceWith)
    handleTemplateUpdate(newContent)
  }
  const handleVariableInsert = (variable) => {
    const cursorPos = editorRef.current.getCursorPosition()
    const newContent =
      selectedTemplate.content.slice(0, cursorPos) + `{{ ${variable} }}` + selectedTemplate.content.slice(cursorPos)
    handleTemplateUpdate(newContent)
  }
  const handleSchemaEdit = (schema) => {}
  const handlePreview = () => {}
  const handleExport = () => {}
  const handleImport = (templates) => {
    setTemplates([...templates, ...templates])
  }
  const editorRef = useRef(null)
  return (
    (<div className="flex h-screen w-full">
      <div className="bg-muted/40 w-64 border-r p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Templates</h2>
          <Button onClick={handleTemplateCreate}>
            <PlusIcon className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
        <div className="space-y-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`rounded-md px-3 py-2 cursor-pointer transition-colors hover:bg-muted ${
                selectedTemplate.id === template.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground"
              }`}
              onClick={() => handleTemplateEdit(template)}>
              {template.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold flex-1">{selectedTemplate.name}</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Find"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40" />
            <Input
              placeholder="Replace"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              className="w-40" />
            <Button onClick={handleSearch}>
              <SearchIcon className="w-4 h-4 mr-2" />
              Replace
            </Button>
            <Button onClick={handlePreview}>
              <EyeIcon className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleExport}>
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleImport}>
              <UploadIcon className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
        <div className="border rounded-md overflow-hidden h-[calc(100vh-160px)]">
          <div className="font-mono text-sm" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => handleTemplateDelete(selectedTemplate)}>
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button>
            <SaveIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>)
  );
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>)
  );
}


function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function SaveIcon(props) {
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
        d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
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


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}


function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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
