import React, { useState, useMemo } from 'react'
import { Search, ShieldCheck, Zap, Lock } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'
import ToolCard from '../components/ToolCard.jsx'
import { categories, tools } from '../data/tools.js'

export default function Home() {
  const [query, setQuery] = useState('')

  const filteredTools = useMemo(() => {
    if (!query.trim()) return tools
    const q = query.toLowerCase()
    return tools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <>
      <Seo
        title="Free Online PDF, Image, Text & Generator Tools"
        description="Merge PDFs, compress images, count words, generate QR codes and more — all free and processed locally in your browser."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            18 free tools · 100% client-side
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fadeInUp">
            Every tool you need.
            <br /> Right in your browser.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg animate-fadeInUp">
            PDF, image, text and generator tools that never upload your files to a server.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a tool, e.g. 'merge pdf'..."
                className="w-full rounded-2xl border-0 bg-white/95 py-4 pl-12 pr-4 text-sm text-slate-800 shadow-softer outline-none ring-4 ring-white/20 transition-all focus:ring-brand-300"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/85">
            <span className="flex items-center gap-1.5"><Lock size={14} /> Privacy-first</span>
            <span className="flex items-center gap-1.5"><Zap size={14} /> Instant processing</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> No sign-up</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AdSlot variant="banner" />
      </div>

      {/* Search results override */}
      {query.trim() ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold">
            {filteredTools.length} result{filteredTools.length !== 1 && 's'} for "{query}"
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {categories.map((cat, idx) => (
            <section key={cat.id} id={cat.id} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{cat.name}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
                </div>
                <span className={`hidden h-1.5 w-24 rounded-full bg-gradient-to-r ${cat.color} sm:block`} />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tools.filter((t) => t.category === cat.id).map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
              {idx === 1 && (
                <div className="mt-10">
                  <AdSlot variant="inContent" />
                </div>
              )}
            </section>
          ))}
        </>
      )}
    </>
  )
}
