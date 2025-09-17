import React, { useState } from 'react'
import ReactMarkdown from "react-markdown"
export default function Markdown() {
    const [content, setContent] = useState("");
  return (
    <div className="editor">
        <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={50} 
        />
        <h3>Xem trước: </h3>
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
