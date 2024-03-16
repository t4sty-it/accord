import { useState, ChangeEventHandler } from 'react'

export function useFormFieldState<T>(initialValue: T, parse: (value: string) => T) {
  const [state, setState] = useState(initialValue)

  const onStateChange: ChangeEventHandler<HTMLInputElement> = e => {
    setState(parse(e.target.value))
  }

  return [state, onStateChange] as const
}