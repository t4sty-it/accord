import { FormEventHandler } from 'react'

export function onSubmit(cb: () => void): FormEventHandler<HTMLFormElement> {
  return e => {
    e.preventDefault()
    e.stopPropagation()
    cb()
  }
}