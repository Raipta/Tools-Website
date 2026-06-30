import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import ToolLayout from '../components/ToolLayout.jsx'
import { tools } from '../data/tools.js'

export default function ComingSoon() {
  const { toolId } = useParams()
  const tool = tools.find((t) => t.path === `/tools/${toolId}`) || {
    name: 'This tool',
    description: 'This tool is on its way.',
    icon: Hammer,
  }

  return (
    <ToolLayout title={tool.name} description={tool.description} icon={tool.icon}>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
          <Hammer size={28} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Coming soon</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          We're still building {tool.name}. In the meantime, check out our fully working{' '}
          <Link to="/tools/merge-pdf" className="font-medium text-brand-600 hover:underline">Merge PDF</Link> tool.
        </p>
      </div>
    </ToolLayout>
  )
}
