import { createContext } from "react"

export const MultiplayerContext = createContext({
  logIn: (username: string) => {},
  connect: (remoteUser: string) => {}
})