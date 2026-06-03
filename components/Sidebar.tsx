'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { phases } from '@/lib/data'
import { useProgress } from '@/lib/useProgress'
import ProgressBar from './ProgressBar'

export default function Sidebar() {
  const pathname = usePathname()
  const { getPhaseProgress, globalProgress, resetAll } = useProgress()
  const { done, total } = globalProgress()

  return (
    <aside className="w-72 flex-shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-5 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1L2 4v4c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V4L8 1z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">CSNA</p>
            <p className="text-xs text-slate-500">Révision interactive</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">Progression globale</p>
          <ProgressBar done={done} total={total} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        {phases.map((phase) => {
          const { done: pd, total: pt } = getPhaseProgress(phase.id)
          const isActive = pathname === `/phase/${phase.id}`
          const pct = pt === 0 ? 0 : Math.round((pd / pt) * 100)
          const complete = pd === pt && pt > 0

          return (
            <Link
              key={phase.id}
              href={`/phase/${phase.id}`}
              className={`block rounded-lg px-3 py-2.5 transition-all duration-150 group
                ${isActive
                  ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                  : 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 border border-transparent'
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  {phase.title}
                </span>
                <span className={`text-xs tabular-nums ${complete ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {complete ? '✓' : `${pd}/${pt}`}
                </span>
              </div>
              <p className="text-xs leading-tight truncate">{phase.subtitle}</p>
              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${complete ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700">
        <button
          onClick={resetAll}
          className="w-full px-3 py-2 text-xs font-medium text-slate-500 border border-slate-600 rounded-md hover:border-red-500/50 hover:text-red-400 transition-colors"
        >
          Tout réinitialiser
        </button>
      </div>
    </aside>
  )
}
