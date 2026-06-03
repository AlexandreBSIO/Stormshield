'use client'

import Link from 'next/link'
import type { Phase } from '@/lib/data'
import { useProgress } from '@/lib/useProgress'
import PhaseHeader from '@/components/PhaseHeader'
import ChecklistItem from '@/components/ChecklistItem'
import KeyPointsAccordion from '@/components/KeyPointsAccordion'
import ProgressBar from '@/components/ProgressBar'

interface Props {
  phase: Phase
  prevId: number | null
  nextId: number | null
}

export default function PhaseClient({ phase, prevId, nextId }: Props) {
  const { progress, toggle, resetPhase, getPhaseProgress } = useProgress()
  const { done, total } = getPhaseProgress(phase.id)
  const checked = progress[`phase${phase.id}`] ?? []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
      {/* Phase progress bar */}
      <div className="mb-6">
        <ProgressBar done={done} total={total} />
      </div>

      <PhaseHeader
        phase={phase}
        done={done}
        total={total}
        onReset={() => resetPhase(phase.id)}
      />

      {/* Checklist */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 px-5 py-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Étapes à réaliser
        </h2>
        <ul className="space-y-3">
          {phase.steps.map((step, i) => (
            <ChecklistItem
              key={i}
              index={i}
              text={step}
              checked={checked[i] ?? false}
              onToggle={() => toggle(phase.id, i)}
            />
          ))}
        </ul>
      </div>

      {/* Key points accordion */}
      <KeyPointsAccordion keyPoints={phase.keyPoints} />

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {prevId ? (
          <Link
            href={`/phase/${prevId}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 border border-slate-600 rounded-lg hover:border-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="10 4 6 8 10 12" />
            </svg>
            Phase {prevId}
          </Link>
        ) : (
          <div />
        )}

        <span className="text-xs text-slate-600">
          {phase.id} / 8
        </span>

        {nextId ? (
          <Link
            href={`/phase/${nextId}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 border border-slate-600 rounded-lg hover:border-slate-400 hover:text-slate-200 transition-colors"
          >
            Phase {nextId}
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="6 4 10 8 6 12" />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-400 border border-emerald-500/40 rounded-lg bg-emerald-500/10">
            Fin du cours ✓
          </div>
        )}
      </div>
    </div>
  )
}
