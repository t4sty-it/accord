import * as THREE from 'three'
import { GameObject } from "../lib/Gameobject";
import { Component } from '../lib/Component';

export class TransformComponent implements Component {
  name: 'transform' = 'transform';

  parent: GameObject | null = null

  constructor(
    public readonly position: THREE.Vector3 = new THREE.Vector3(),
    public readonly rotation: THREE.Euler = new THREE.Euler(),
    public readonly scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
  ){}

  private updateParent(time: number) {
    if (this.parent == null) return
    
    this.parent.obj.position.copy(this.position)
    this.parent.obj.rotation.copy(this.rotation)
    this.parent.obj.scale.copy(this.scale)
    
  }

  start(): void {
    this.updateParent(0)
  }
  update(time: number): void {
    this.updateParent(time)
  }
  onAdd(to: GameObject): void {
    this.parent = to
  }
  onRemove(from: GameObject): void {
    this.parent = null
  }

}