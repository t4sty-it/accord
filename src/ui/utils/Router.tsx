import { ReactNode, useEffect, useState } from "react"

type Props = {
  route: () => string,
  routes: Record<string, () => ReactNode>
}

let timer: Timer | null = null

export function Router({route, routes}: Props) {

  const [currentRoute, setCurrentRoute] = useState<string>()

  useEffect(() => {
    if (timer == null) {
      timer = setInterval(() => {
        const r = route()
        setCurrentRoute(_ => r)
      }, 100)
    }
  }, [])

  return currentRoute
    ? Object.keys(routes).includes(currentRoute)
      ? routes[currentRoute]()
      : <div>404</div>
    : <div></div>
}