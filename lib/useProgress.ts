'use client'

import { useState, useEffect, useCallback } from 'react'
import { phases } from './data'

const STORAGE_KEY = 'csna-progress'

type ProgressState = Record<string, boolean[]>

function buildInitial(): ProgressState {
  const state: ProgressState = {}
  phases.forEach((p) => {
    state[`phase${p.id}`] = new Array(p.steps.length).fill(false)
  })
  return state
}

function loadFromStorage(): ProgressState {
  if (typeof window === 'undefined') return buildInitial()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildInitial()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    const initial = buildInitial()
    Object.keys(initial).forEach((key) => {
      if (Array.isArray(parsed[key]) && parsed[key]!.length === initial[key].length) {
        initial[key] = parsed[key]!
      }
    })
    return initial
  } catch {
    return buildInitial()
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(buildInitial)

  useEffect(() => {
    setProgress(loadFromStorage())
  }, [])

  const save = useCallback((next: ProgressState) => {
    setProgress(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const toggle = useCallback(
    (phaseId: number, stepIndex: number) => {
      setProgress((prev) => {
        const key = `phase${phaseId}`
        const arr = [...prev[key]]
        arr[stepIndex] = !arr[stepIndex]
        const next = { ...prev, [key]: arr }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    []
  )

  const resetPhase = useCallback(
    (phaseId: number) => {
      setProgress((prev) => {
        const key = `phase${phaseId}`
        const next = { ...prev, [key]: new Array(prev[key].length).fill(false) }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    []
  )

  const resetAll = useCallback(() => {
    const fresh = buildInitial()
    save(fresh)
  }, [save])

  const getPhaseProgress = useCallback(
    (phaseId: number) => {
      const arr = progress[`phase${phaseId}`] ?? []
      return { done: arr.filter(Boolean).length, total: arr.length }
    },
    [progress]
  )

  const globalProgress = useCallback(() => {
    let done = 0
    let total = 0
    phases.forEach((p) => {
      const arr = progress[`phase${p.id}`] ?? []
      done += arr.filter(Boolean).length
      total += arr.length
    })
    return { done, total }
  }, [progress])

  return { progress, toggle, resetPhase, resetAll, getPhaseProgress, globalProgress }
}
