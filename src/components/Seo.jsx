import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} | ToolKit Hub` : 'ToolKit Hub — Free Online Utility Tools'
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Free, fast, privacy-first online tools for PDFs, images, text and more.'} />
    </Helmet>
  )
}
