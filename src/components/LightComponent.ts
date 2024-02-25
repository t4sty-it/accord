import * as THREE from 'three'
import { GameObject } from '../lib/Gameobject';
import { Component } from '../lib/Component';


export class LightComponent extends Component {
  name: 'light' = 'light'

  constructor(
    public readonly light: THREE.Light
  ){
    super()
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