import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Seo from './Seo.jsx'
import AdSlot from './AdSlot.jsx'

export default function ToolLayout({ title, description, icon: Icon, children }) {
  return (
    <>
      <Seo title={title} description={description} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-500">
          <ChevronLeft size={16} /> Back to all tools
        </Link>

        <div className="mb-8 flex items-center gap-4">
          {Icon && (
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
              <Icon size={22} />
            </span>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft">
            {children}
          </div>
          <aside className="hidden lg:block">
            <AdSlot variant="sidebar" />
          </aside>
        </div>

        <div className="mt-10">
          <AdSlot variant="inContent" />
        </div>
      </div>
    </>
  )
}
