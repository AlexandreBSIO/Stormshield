'use client'

import { useState } from 'react'
import type { KeyPoint } from '@/lib/data'

interface Props {
  keyPoints: KeyPoint[]
}

export default function KeyPointsAccordion({ keyPoints }: Props) {
  const [open, setOpen] = useState(false)

  const warnings = keyPoints.filter((p) => p.type === 'warning')
  const infos = keyPoints.filter((p) => p.type === 'info')

  return (
    <div className="mt-4 rounded-lg border border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-700/60 transition-colors text-left"
      >
        <span className="text-sm font-medium text-slate-300">
          Points clés de révision
          <span className="ml-2 text-xs text-slate-500">
            ({warnings.length} vigilances · {infos.length} chemins)
          </span>
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </button>

      {open && (
        <div className="px-4 py-4 bg-slate-900/40 space-y-4">
          {warnings.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
                Points de vigilance
              </p>
              <ul className="space-y-2">
                {warnings.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded bg-amber-500/15 text-amber-400 text-xs">
                      ⚠
                    </span>
                    <span className="text-sm text-amber-200/80 leading-relaxed">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {infos.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                Chemins de navigation
              </p>
              <ul className="space-y-2">
                {infos.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded bg-blue-500/15 text-blue-400 text-xs">
                      ℹ
                    </span>
                    <span className="text-sm text-blue-200/80 leading-relaxed font-mono text-xs">
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
