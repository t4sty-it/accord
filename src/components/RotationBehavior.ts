import * as THREE from 'three'
import { Component, GameObject } from "../lib/Gameobject";

export class RotationBehavior implements Component {
  name: 'rotation' = 'rotation'

  parent: GameObject | null = null

  constructor(
    public readonly speed: THREE.Euler
  ){}

  start() {}
  update(time: number) {
    if (parent == null) return

    this.parent?.obj.rotation.set(this.speed.x * time, this.speed.y * time, this.speed.z * time)
  }

  onAdd(gameObject: GameObject): void {
    this.parent = gameObject
  }

  onRemove(from: GameObject): void {
    this.parent = null
  }
}