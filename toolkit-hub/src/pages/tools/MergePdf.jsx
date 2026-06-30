import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileStack, X, GripVertical, Download, Loader2 } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout.jsx'
import FileDropzone from '../../components/FileDropzone.jsx'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

export default function MergePdf() {
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [resultSize, setResultSize] = useState(0)
  const [error, setError] = useState(null)
  const [dragIndex, setDragIndex] = useState(null)

  function addFiles(newFiles) {
    const pdfFiles = newFiles.filter((f) => f.type === 'application/pdf')
    if (!pdfFiles.length) {
      setError('Please select valid PDF files.')
      return
    }
    setError(null)
    setResultUrl(null)
    setFiles((prev) => [...prev, ...pdfFiles.map((f) => ({ file: f, id: `${f.name}-${f.size}-${Math.random()}` }))])
  }

  function removeFile(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setResultUrl(null)
  }

  function handleDragStart(idx) { setDragIndex(idx) }
  function handleDragOver(e, idx) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === idx) return
    setFiles((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(dragIndex, 1)
      updated.splice(idx, 0, moved)
      return updated
    })
    setDragIndex(idx)
  }
  function handleDragEnd() { setDragIndex(null) }

  async function mergePdfs() {
    if (files.length < 2) {
      setError('Add at least 2 PDF files to merge.')
      return
    }
    setError(null)
    setProcessing(true)
    setResultUrl(null)

    try {
      const mergedPdf = await PDFDocument.create()

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([mergedBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
      setResultSize(blob.size)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while merging. Make sure all files are valid, non-corrupted PDFs.')
    } finally {
      setProcessing(false)
    }
  }

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0)

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document — entirely in your browser."
      icon={FileStack}
    >
      <FileDropzone
        onFiles={addFiles}
        accept="application/pdf"
        multiple
        label="Drag & drop PDF files here, or click to browse"
      />

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/40 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {files.length} file{files.length !== 1 && 's'} · {formatBytes(totalSize)}
            </h3>
            <p className="text-xs text-slate-400">Drag to reorder</p>
          </div>

          <ul className="space-y-2">
            {files.map((f, idx) => (
              <li
                key={f.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5 transition-shadow ${dragIndex === idx ? 'shadow-softer' : ''}`}
              >
                <GripVertical size={16} className="cursor-grab text-slate-400" />
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-[11px] font-bold text-white">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{f.file.name}</p>
                  <p className="text-xs text-slate-400">{formatBytes(f.file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(f.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={mergePdfs}
              disabled={processing || files.length < 2}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Merging...
                </>
              ) : (
                <>
                  <FileStack size={16} /> Merge {files.length} PDFs
                </>
              )}
            </button>

            {resultUrl && (
              <a
                href={resultUrl}
                download="merged.pdf"
                className="btn-secondary"
              >
                <Download size={16} /> Download merged.pdf ({formatBytes(resultSize)})
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl bg-brand-50 dark:bg-brand-900/10 p-4 text-xs text-slate-500 dark:text-slate-400">
        Your files are processed locally using your browser's memory — nothing is uploaded to any server.
      </div>
    </ToolLayout>
  )
}
