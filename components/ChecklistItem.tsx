'use client'

interface Props {
  text: string
  checked: boolean
  onToggle: () => void
  index: number
}

export default function ChecklistItem({ text, checked, onToggle, index }: Props) {
  return (
    <li
      className="flex items-start gap-3 group cursor-pointer select-none"
      onClick={onToggle}
    >
      <div className="mt-0.5 flex-shrink-0">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
            ${checked
              ? 'bg-blue-500 border-blue-500'
              : 'border-slate-500 group-hover:border-blue-400'
            }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1.5 6 4.5 9 10.5 3" />
            </svg>
          )}
        </div>
      </div>
      <span
        className={`text-sm leading-relaxed transition-all duration-200
          ${checked
            ? 'line-through text-slate-500'
            : 'text-slate-200 group-hover:text-white'
          }`}
      >
        <span className="text-slate-500 mr-2 font-mono text-xs">{String(index + 1).padStart(2, '0')}.</span>
        {text}
      </span>
    </li>
  )
}
