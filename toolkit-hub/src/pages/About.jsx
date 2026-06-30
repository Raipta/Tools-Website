import React from 'react'
import Seo from '../components/Seo.jsx'
import { ShieldCheck, Zap, Heart } from 'lucide-react'

export default function About() {
  return (
    <>
      <Seo title="About" description="ToolKit Hub is a free collection of privacy-first, browser-based utility tools." />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About ToolKit Hub</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          ToolKit Hub started from a simple frustration: most "free" online tools quietly upload your files to a
          server, bury you in pop-up ads, or ask for an account just to convert a file. We wanted something
          faster, cleaner and more respectful of your data.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Every tool we build runs directly in your browser using modern JavaScript libraries — so your PDFs,
          images and text never leave your device unless you choose to download the result.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <ShieldCheck className="text-brand-500" />
            <h3 className="mt-3 font-semibold">Privacy-first</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Nothing is uploaded to our servers.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <Zap className="text-brand-500" />
            <h3 className="mt-3 font-semibold">Fast</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No server round-trips means instant results.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <Heart className="text-brand-500" />
            <h3 className="mt-3 font-semibold">Free</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No sign-ups, no paywalls.</p>
          </div>
        </div>
      </div>
    </>
  )
}
