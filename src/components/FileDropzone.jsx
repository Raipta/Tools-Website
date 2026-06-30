import React, { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function FileDropzone({ onFiles, accept = '.pdf', multiple = true, label = 'Drag & drop files here, or click to browse' }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFiles(fileList) {
    const files = Array.from(fileList)
    if (files.length) onFiles(files)
  }

  return (
    <div
      className={`dropzone ${dragging ? 'bg-brand-100 dark:bg-brand-900/30' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft">
        <UploadCloud size={26} />
      </div>
      <p className="font-medium text-slate-700 dark:text-slate-200">{label}</p>
      <p className="text-xs text-slate-400">Files never leave your browser</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
