import * as THREE from 'three'
import { Component, GameObject } from '../lib/Gameobject';


export class LightComponent implements Component {
  name: 'light' = 'light'

  constructor(
    public readonly light: THREE.Light
  ){}

  start(): void {}
  update(time: number): void {}
  onAdd(to: GameObject): void {
    to.obj.add(this.light)
  }
  onRemove(from: GameObject): void {
    from.obj.remove(this.light)
  }

}