import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ToolCard({ tool }) {
  const Icon = tool.icon
  const isSoon = tool.status === 'soon'

  const content = (
    <div className="card-hover group relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-soft">
      {isSoon && (
        <span className="absolute right-3 top-3 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Soon
        </span>
      )}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-soft transition-transform group-hover:scale-110">
        <Icon size={20} />
      </div>
      <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
      {!isSoon && (
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
          Open tool <ArrowRight size={14} />
        </span>
      )}
    </div>
  )

  if (isSoon) {
    return <div className="cursor-not-allowed opacity-90">{content}</div>
  }

  return (
    <Link to={tool.path} className="block h-full">
      {content}
    </Link>
  )
}
