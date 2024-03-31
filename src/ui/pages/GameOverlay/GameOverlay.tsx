import './GameOverlay.scss'
import { useState, useContext, useSyncExternalStore, useEffect } from 'react'
import { clsx } from '../../utils/clsx'
import { generateUsername } from '../../utils/generateUsername'
import { ConnectionMenu } from '../../components/organisms/ConnectionMenu'
import { MultiplayerContext } from '../../context/MultiplayerContext'
import { DebugInfo } from '../../components/organisms/DebugInfo'
import { GameInfo } from '../../components/organisms/GameInfo'
import { LoadingBar } from '../../components/molecules/LoadingBar/LoadingBar'
import { StoresContext } from '../../context/StoresContext'

const showDebugInfo = true

export function GameOverlay() {

  const mp = useContext(MultiplayerContext)

  const [showConnectionMenu, setShowConnectionMenu] = useState(false)
  const [username, setUsername] = useState(generateUsername())
  const onSetUsername = (username: string) => {
    setUsername(username)
    mp.logIn(username)
  }

  const [remoteUser, setRemoteUser] = useState('')
  const onSetRemoteUser = (username: string) => {
    setRemoteUser(username)
    setShowConnectionMenu(false)
    mp.connect(username)
  }

  const playerStore = useContext(StoresContext).player
  const player = useSyncExternalStore(
    playerStore.subscribe.bind(playerStore),
    playerStore.getSnapshot.bind(playerStore)
  )

  const className = clsx('game-overlay', showConnectionMenu && 'game-overlay--active');

  return (
    <div className={className}>

      {!showConnectionMenu &&
        <GameInfo
          userName={username}
          onOpenMenu={() => setShowConnectionMenu(true)}
        ></GameInfo>
      }

      {showConnectionMenu &&
        <div className="game-overlay__fullscreen">
          <ConnectionMenu
            show={showConnectionMenu}
            onClose={() => setShowConnectionMenu(false)}
            username={username}
            setUsername={onSetUsername}
            remoteUser={remoteUser}
            connect={onSetRemoteUser}
          />
        </div>
      }

      {showDebugInfo &&
        <DebugInfo></DebugInfo>
      }

      <div className="game-overlay__health">
        <LoadingBar progress={player.health / 100}/>
      </div>
      
    </div>
  )
}