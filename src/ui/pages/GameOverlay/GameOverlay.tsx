import './GameOverlay.scss'
import { useState, useContext } from 'react'
import { clsx } from '../../utils/clsx'
import { generateUsername } from '../../utils/generateUsername'
import { ConnectionMenu } from '../../components/organisms/ConnectionMenu'
import { MultiplayerContext } from '../../context/MultiplayerContext'
import { DebugInfo } from '../../components/organisms/DebugInfo'
import { GameInfo } from '../../components/organisms/GameInfo'

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
      
    </div>
  )
}