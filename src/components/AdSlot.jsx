import React from 'react'

/**
 * Reserved ad placement zone.
 * Swap the inner content for your AdSense <ins> tag / script once approved.
 * Keeping a fixed min-height avoids layout shift (good for CLS / UX).
 */
export default function AdSlot({ variant = 'banner', className = '' }) {
  const sizes = {
    banner: 'min-h-[90px] w-full',
    sidebar: 'min-h-[250px] w-full max-w-[300px]',
    inContent: 'min-h-[120px] w-full',
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-400 ${sizes[variant]} ${className}`}
      aria-hidden="true"
    >
      Ad space
    </div>
  )
}
