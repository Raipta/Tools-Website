import React from 'react'
import Seo from '../components/Seo.jsx'

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description="Learn how ToolKit Hub handles your data — all processing happens locally in your browser." />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <p>
            ToolKit Hub ("we", "us") provides free online utility tools. This page explains what data, if any,
            we collect when you use our tools.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Your files stay on your device</h2>
          <p>
            Every tool on ToolKit Hub — including Merge PDF, Split PDF, image compression, and our generators —
            runs entirely client-side, inside your web browser. The documents, images and text you upload or type
            are processed using JavaScript libraries running locally on your device. They are never transmitted
            to, or stored on, our servers.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Information we may collect</h2>
          <p>
            We may use privacy-respecting analytics to understand aggregate usage (e.g. which tool pages are
            visited) and standard web server logs (IP address, browser type) for security and performance
            monitoring. We do not sell personal data.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Cookies & advertising</h2>
          <p>
            We may display ads through third-party networks (such as Google AdSense) to keep ToolKit Hub free.
            These networks may use cookies or similar technologies to serve relevant ads. You can control cookie
            preferences through your browser settings or via the Google Ads Settings page.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Third-party links</h2>
          <p>
            Our site may link to third-party websites. We are not responsible for the privacy practices of those
            sites.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use of ToolKit Hub after changes
            constitutes acceptance of the revised policy.
          </p>

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Contact us</h2>
          <p>If you have any questions about this policy, please reach out via our Contact page.</p>
        </div>
      </div>
    </>
  )
}
