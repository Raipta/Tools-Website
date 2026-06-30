import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import MergePdf from './pages/tools/MergePdf.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Fully working tool */}
          <Route path="/tools/merge-pdf" element={<MergePdf />} />

          {/* Placeholder for remaining tools — wire up real components as you build them */}
          <Route path="/tools/:toolId" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
