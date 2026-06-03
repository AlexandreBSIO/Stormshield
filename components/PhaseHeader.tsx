import type { Phase } from '@/lib/data'

interface Props {
  phase: Phase
  done: number
  total: number
  onReset: () => void
}

export default function PhaseHeader({ phase, done, total, onReset }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {phase.title}
          </span>
          <span className="text-xs text-slate-500 font-mono">· pages {phase.pages}</span>
        </div>
        <h1 className="text-xl font-bold text-white leading-tight">{phase.subtitle}</h1>
        <p className="mt-1 text-sm text-slate-400">
          {done === total && total > 0 ? (
            <span className="text-emerald-400 font-medium">Toutes les étapes complétées ✓</span>
          ) : (
            <>{done}/{total} étapes complétées</>
          )}
        </p>
      </div>
      <button
        onClick={onReset}
        className="flex-shrink-0 self-start px-3 py-1.5 text-xs font-medium text-slate-400 border border-slate-600 rounded-md hover:border-slate-400 hover:text-slate-200 transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  )
}
