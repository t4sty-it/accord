type Props = {
  userName: string,
  onOpenMenu: () => void
}

export function GameInfo({userName, onOpenMenu}: Props) {

  return (
    <div className="game-info">
      <button onClick={onOpenMenu}>{userName ?? 'Menu'}</button>
    </div>
  )
}