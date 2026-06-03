'use client'

interface Props {
  done: number
  total: number
}

export default function ProgressBar({ done, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium text-slate-300 tabular-nums whitespace-nowrap">
        {done}/{total} étapes
      </span>
      <span className="text-sm font-bold text-blue-400 tabular-nums w-10 text-right">
        {pct}%
      </span>
    </div>
  )
}
