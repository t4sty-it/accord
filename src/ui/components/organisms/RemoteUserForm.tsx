import { useFormFieldState } from "../../hooks/useFormFieldState"
import { clsx } from "../../utils/clsx"
import { generateUsername } from "../../utils/generateUsername"
import { onSubmit } from "../../utils/onSubmit"

type Props = {
  username: string,
  setUsername: (username: string) => void,
  waitForConnection: () => void
}

export function RemoteUserForm({
  username: initialUsername,
  setUsername,
  waitForConnection,
}: Props) {

  const [remoteUser, setRemoteUser] = useFormFieldState(initialUsername ?? '', x => x)
  const onSetUsername = onSubmit(() => {
    if (remoteUser != '') setUsername(remoteUser)
  })
  const remoteClsx = clsx('remote-user', remoteUser != '' && 'remote-user--disabled')

  return (
    <form onSubmit={onSetUsername} className={remoteClsx}>
      <label>
        <h3 className="secondary">Connect to other player</h3>
        <input
          value={remoteUser}
          onChange={setRemoteUser}
          placeholder={generateUsername()}
        />
      </label>
      <button className="primary">CONNECT</button>
      <button className="secondary" onClick={waitForConnection}>NO, WAIT FOR A FRIEND TO CONNECT</button>
    </form>
  )
}