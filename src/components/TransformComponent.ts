import * as THREE from 'three'
import { Component } from '../lib/Component';

export class TransformComponent extends Component {
  name: 'transform' = 'transform';

  constructor(
    public readonly position: THREE.Vector3 = new THREE.Vector3(),
    public readonly rotation: THREE.Euler = new THREE.Euler(),
    public readonly scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
  ){ super() }

  private updateParent(_time: number) {
    if (this.gameObject == null) return
    
    this.gameObject.obj.position.copy(this.position)
    this.gameObject.obj.rotation.copy(this.rotation)
    this.gameObject.obj.scale.copy(this.scale)
  }

  start(): void {
    this.updateParent(0)
  }
  update(time: number): void {
    this.updateParent(time)
  }
}