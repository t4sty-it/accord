import './LoadingBar.scss'

export function LoadingBar({
  progress, showLabel = false
}: {
  progress: number,
  showLabel?: boolean
}) {
  const percent = Math.round(progress * 100)

  return (
    <div className="loading-bar" data-progress={percent}>
      <div className="loading-bar__container">
        <div className="loading-bar__bg"></div>
      </div>
      {showLabel &&
        <div className="loading-bar__content">
          {percent}%
        </div>
      }
    </div>
  )
}