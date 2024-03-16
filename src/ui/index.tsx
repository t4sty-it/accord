import { createRoot } from 'react-dom/client'
import { GameOverlay } from './pages/GameOverlay/GameOverlay'
import './styles/index.scss'
import { MultiplayerContext } from './context/MultiplayerContext'
import { DebugContext } from './context/DebugContext'

type Props = {
  multiplayer: {
    logIn: (username: string) => void,
    connect: (remoteUser: string) => void
  },
  debug: {
    getData: () => string
  }
}

export function renderUI(props: Props) {


  const root = createRoot(document.getElementById('ui')!)
  root.render(
    <MultiplayerContext.Provider value={props.multiplayer}>
      <DebugContext.Provider value={props.debug}>
        <GameOverlay/>
      </DebugContext.Provider>
    </MultiplayerContext.Provider>
  )
}