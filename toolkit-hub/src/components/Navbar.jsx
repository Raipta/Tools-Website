import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Moon, Sun, Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { tools, categories } from '../data/tools.js'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    setResults(
      tools.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      ).slice(0, 6)
    )
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setResults([])
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToTool(path) {
    setQuery('')
    setResults([])
    setMobileOpen(false)
    navigate(path)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-soft">
            <Sparkles size={18} />
          </span>
          <span className="hidden sm:inline bg-brand-gradient bg-clip-text text-transparent">ToolKit Hub</span>
        </Link>

        {/* Category dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setCategoryOpen((o) => !o)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Categories <ChevronDown size={15} />
          </button>
          {categoryOpen && (
            <div
              onMouseLeave={() => setCategoryOpen(false)}
              className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-softer animate-fadeInUp"
            >
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/#${c.id}`}
                  onClick={() => setCategoryOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/20"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-brand-400 transition-all"
          />
          {results.length > 0 && (
            <div className="absolute mt-2 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-softer animate-fadeInUp">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => goToTool(r.path)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-brand-50 dark:hover:bg-brand-900/20"
                >
                  <r.icon size={16} className="text-brand-500" />
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/#${c.id}`}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/20"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
