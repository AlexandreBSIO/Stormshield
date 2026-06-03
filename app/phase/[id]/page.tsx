import { notFound } from 'next/navigation'
import { phases } from '@/lib/data'
import PhaseClient from './PhaseClient'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return phases.map((p) => ({ id: String(p.id) }))
}

export default function PhasePage({ params }: Props) {
  const id = parseInt(params.id, 10)
  const phase = phases.find((p) => p.id === id)
  if (!phase) notFound()

  const prevPhase = phases.find((p) => p.id === id - 1) ?? null
  const nextPhase = phases.find((p) => p.id === id + 1) ?? null

  return <PhaseClient phase={phase} prevId={prevPhase?.id ?? null} nextId={nextPhase?.id ?? null} />
}
