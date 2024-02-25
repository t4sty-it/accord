import * as THREE from 'three'
import { GameObject } from "../lib/Gameobject";
import { Component } from '../lib/Component';

export class CameraComponent extends Component {
  name = 'perspective camera'

  constructor(
    public readonly camera: THREE.Camera
  ){ super() }

  onAdd(to: GameObject): void {
    super.onAdd(to)
    this.gameObject?.obj.add(this.camera)
  }

  onRemove(from: GameObject): void {
    this.gameObject?.obj.remove(this.camera)
    super.onRemove(from)
  }
}

export function isCameraComponent(x: Component): x is CameraComponent {
  return Object.keys(x).includes('camera')
}