import { useFormFieldState } from "../../hooks/useFormFieldState"
import { clsx } from "../../utils/clsx"
import { onSubmit } from "../../utils/onSubmit"

type Props = {
  username: string,
  setUsername: (username: string) => void
}

export function LocalUserForm({username: initialUsername, setUsername}: Props) {

  const [localUser, setLocalUser] = useFormFieldState(initialUsername ?? '', x => x)
  const onSetUsername = onSubmit(() => {
    if (localUser != '') setUsername(localUser)
  })
  const localClsx = clsx('local-user', localUser != '' && 'local-user--disabled')

  return (
    <form onSubmit={onSetUsername} className={localClsx}>
      <label>
        <h3 className="secondary">Choose a username</h3>
        <input
          value={localUser}
          onChange={setLocalUser}
        />
      </label>
      <button className="primary">LOG IN</button>
    </form>
  )
}