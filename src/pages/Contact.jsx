import React, { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Mail, Send } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Seo title="Contact" description="Get in touch with the ToolKit Hub team." />
      <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact us</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Mail size={16} /> hello@toolkithub.app
        </p>

        {sent ? (
          <div className="mt-8 rounded-xl bg-brand-50 dark:bg-brand-900/20 p-5 text-sm text-brand-700 dark:text-brand-300">
            Thanks for reaching out! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
              <input required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
              <input type="email" required className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Message</label>
              <textarea required rows={5} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <button type="submit" className="btn-primary">
              <Send size={16} /> Send message
            </button>
          </form>
        )}
      </div>
    </>
  )
}
