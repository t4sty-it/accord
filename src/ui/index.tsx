import { createRoot } from 'react-dom/client'
import { GameOverlay } from './pages/GameOverlay/GameOverlay'
import './styles/index.scss'
import { MultiplayerContext } from './context/MultiplayerContext'
import { DebugContext } from './context/DebugContext'
import { ReactNode } from 'react'
import { AssetLoading } from './pages/AssetLoading/AssetLoading'
import { Router } from './utils/Router'
import { AssetLoadingContext } from './context/AssetLoadingContext'
import { ObservableStore } from '../lib/utils/ObservableStore'
import { Player } from '../stores/PlayerStore'
import { StoresContext } from './context/StoresContext'

export type Route = 'loading' | 'connect'

type Props = {
  route: () => Route,
  assetsLoaded: () => number,
  multiplayer: {
    logIn: (username: string) => void,
    connect: (remoteUser: string) => void
  },
  debug: {
    getData: () => string
  },
  playerStore: ObservableStore<Player>
}

const routes: Record<Route, () => ReactNode> = {
  connect: () => <GameOverlay/>,
  loading: () => <AssetLoading/>,
}

export function renderUI(props: Props) {
  const root = createRoot(document.getElementById('ui')!)
  root.render(
    <MultiplayerContext.Provider value={props.multiplayer}>
      <DebugContext.Provider value={props.debug}>
        <AssetLoadingContext.Provider value={{loaded: props.assetsLoaded}}>
          <StoresContext.Provider value={{ player: props.playerStore }}>
            <Router routes={routes} route={props.route}/>
          </StoresContext.Provider>
        </AssetLoadingContext.Provider>
      </DebugContext.Provider>
    </MultiplayerContext.Provider>
  )
}