import { Component } from "../lib/Component";
import * as THREE from 'three'

// let actx: AudioContext | null = null
// window.addEventListener('click', () => actx = new AudioContext())
let _actx: AudioContext | null = null
const actx = () => {
  if (_actx == null) _actx = new AudioContext()
  return _actx
}

const bufferLib: Record<string, AudioBuffer> = {}
const getBuffer = async (url: string) => {
  if (actx == null) return null
  if (bufferLib[url] == null) {
    const response = await fetch(url);
    bufferLib[url] = await actx().decodeAudioData(await response.arrayBuffer());
  }

  return bufferLib[url]
}

export class AudioSourceComponent extends Component {

  private pannerNode: PannerNode

  constructor(
    public readonly url: string,
    public readonly options: {
      playOnStart: boolean
    } = {
      playOnStart: true
    }
  )
  {
    super()

    this.pannerNode = new PannerNode(actx(), {
      panningModel: 'HRTF',
      distanceModel: 'exponential',
      rolloffFactor: 0.5
    })

    this.pannerNode.connect(actx().destination)
    getBuffer(url) // pre-load sound
  }

  start(): void {
    if (this.options.playOnStart)
      this.play()
  }

  update(_time: number): void {
    this.updateSoundPosition()
  }

  private objWorldPos = new THREE.Vector3()
  private pos = new THREE.Vector3()

  private updateSoundPosition() {
    const listener = this.gameObject!.gameScene!.camera!
    
    // set this.pos to this gameobject's position in **listener space**
    this.gameObject!.obj.getWorldPosition(this.objWorldPos)
    this.pos.copy(this.objWorldPos)
    listener.worldToLocal(this.pos)
    
    this.pannerNode.positionX.setValueAtTime(this.pos.x, actx().currentTime)
    this.pannerNode.positionY.setValueAtTime(this.pos.y, actx().currentTime)
    this.pannerNode.positionZ.setValueAtTime(this.pos.z, actx().currentTime)
  }
  
  play() {
    getBuffer(this.url).then(buf => {
      const src = new AudioBufferSourceNode(actx(), { buffer: buf })
      src.connect(this.pannerNode)
      src.start()
      src.onended = () => src.disconnect()
    })
    
  }
}