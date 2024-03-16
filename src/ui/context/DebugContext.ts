import { createContext } from "react"

export const DebugContext = createContext<{
  getData: () => string
}>({
  getData: () => ''
})