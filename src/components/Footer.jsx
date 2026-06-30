import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { categories } from '../data/tools.js'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <Sparkles size={16} />
              </span>
              <span className="bg-brand-gradient bg-clip-text text-transparent">ToolKit Hub</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Free, fast, privacy-first tools that run entirely in your browser.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Categories</h4>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/#${c.id}`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500">About</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Why ToolKit Hub</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>No file uploads — 100% client-side</li>
              <li>No account required</li>
              <li>Free forever</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ToolKit Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
