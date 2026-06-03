'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-slate-300"
        aria-label="Ouvrir le menu"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5h14a1 1 0 000-2H3a1 1 0 000 2zm0 6h14a1 1 0 000-2H3a1 1 0 000 2zm0 6h14a1 1 0 000-2H3a1 1 0 000 2z" clipRule="evenodd"/>
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={() => setOpen(false)}
      >
        <Sidebar />
      </div>
    </>
  )
}
