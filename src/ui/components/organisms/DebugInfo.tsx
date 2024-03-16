import { useContext, useState, useEffect } from 'react'
import { DebugContext } from '../../context/DebugContext'

let timer: Timer

export function DebugInfo() {
  const dbg = useContext(DebugContext)
  const [info, setInfo] = useState('')
  useEffect(() => {
    if (timer == null) {
      timer = setInterval(() => {
        setInfo(_ => dbg.getData())
      }, 200)
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="debug-info">
      <pre>{info}</pre>
    </div>
  )
}