import { ReactNode } from 'react'

import './Card.scss'

type Props = {
  header?: ReactNode
  children?: ReactNode
}

export function Card({header, children}: Props) {
  return (
    <div className="card">
      {header &&
        <div className="card__header">{header}</div>
      }
      {children &&
        <div className="card__body">{children}</div>
      }
    </div>
  )
}