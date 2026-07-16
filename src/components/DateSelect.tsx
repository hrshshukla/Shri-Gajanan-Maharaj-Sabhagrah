import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  value: string
  options: Option[]
  onChange: (name: string, value: string) => void
  ariaLabel?: string
}

export default function DateSelect({ name, value, options, onChange, ariaLabel }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && listRef.current) {
      const active = listRef.current.querySelector('.ds-active') as HTMLElement | null
      if (active) {
        listRef.current.scrollTop = active.offsetTop - listRef.current.clientHeight / 2
      }
    }
  }, [open])

  return (
    <div className={`date-select${open ? ' ds-open' : ''}`} ref={ref} aria-label={ariaLabel}>
      <button
        type="button"
        className="ds-trigger"
        onClick={() => setOpen(o => !o)}
      >
        <span>{selected?.label ?? '—'}</span>
        <ChevronDown size={13} className="ds-chevron" />
      </button>
      {open && (
        <ul className="ds-list" ref={listRef} role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={opt.value === value ? 'ds-active' : ''}
              onClick={() => {
                onChange(name, opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
