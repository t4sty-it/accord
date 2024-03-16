import { useState, useEffect } from 'react'
import { Card } from "../molecules/Card/Card"
import { LocalUserForm } from "./LocalUserForm"
import { RemoteUserForm } from './RemoteUserForm'

type Props = {
  show: boolean,
  onClose: () => void,
  username: string,
  setUsername: (username: string) => void,
  remoteUser: string,
  connect: (remoteUser: string) => void
}
type Phase = 'local' | 'remote'

export function ConnectionMenu({show, onClose, username, setUsername, remoteUser, connect}: Props) {

  const [phase, setPhase] = useState<Phase>('local')
  useEffect(() => {
    if (show) { setPhase('local') }
  }, [show])

  const onSetUsername = (username: string) => {
    setUsername(username)
    setPhase('remote')
  }

  return (
    <div className="connection-menu">
      <Card
          header={<h1>Play with a friend</h1>}
        >
          <div className='column'>
            {phase == 'local' &&
              <LocalUserForm
                username={username}
                setUsername={onSetUsername}/>
            }

            {phase == 'remote' &&
              <RemoteUserForm
                username={remoteUser}
                setUsername={connect}
                waitForConnection={onClose}
              />
            }
          </div>
        </Card>

    </div>
  )
}