import { CanvasTexture } from "three"

export type TextContainer = {
  width: number,
  height: number,
  padding: number,
  fontSize: number,
  backgroundColor: string,
  fontFamily: string,
}

export function text2texture(
  content: string,
  container: TextContainer
) {

  const {
    width: w, height: h, padding: p,
    fontSize: fs, fontFamily: ff,
    backgroundColor: bg
  } = container

  const canvas: HTMLCanvasElement = window.document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.zIndex = '-100'
  canvas.width = w
  canvas.height = h
  document.body.append(canvas)

  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
  ctx.font = `${fs}px ${ff}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  
  ctx?.fillText(content, w / 2, h / 2, w - p * 2)
  return new CanvasTexture(canvas)
}