import * as THREE from 'three'
import { Component, GameObject } from '@engine'


export class LightComponent extends Component {
  name: 'light' = 'light'

  constructor(
    public readonly light: THREE.Light,
    options?: {
      castShadow: boolean,
      shadowQuality?: number
    }
  ){
    super()

    light.castShadow = options?.castShadow ?? false
    if (light.shadow) {
      light.shadow.mapSize.height =
      light.shadow.mapSize.width = Math.pow(2, options?.shadowQuality ?? 9)
    }
  }

  onAdd(to: GameObject): void {
    super.onAdd(to)
    to.obj.add(this.light)
  }
  onRemove(from: GameObject): void {
    super.onRemove(from)
    from.obj.remove(this.light)
  }
}