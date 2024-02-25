import * as THREE from 'three'
import { Component } from '../lib/Component';

export class RotationBehavior extends Component {
  name: 'rotation' = 'rotation'

  constructor(
    public readonly speed: THREE.Euler
  ){ super() }

  start() {}
  update(time: number) {
    if (parent == null) return

    this.gameObject?.obj.rotation.set(
      this.speed.x * time, this.speed.y * time, this.speed.z * time
    )
  }
}