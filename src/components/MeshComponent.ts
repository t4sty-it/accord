import * as THREE from 'three'
import { GameObject } from '../lib/Gameobject'
import { Component } from '../lib/Component'

export class MeshComponent extends Component {
  name: 'mesh' = 'mesh'

  private _mesh: THREE.Mesh
  public get mesh() { return this._mesh }

  constructor(
    public readonly geometry: THREE.BufferGeometry,
    public readonly material: THREE.Material,
    options?: {
      castShadow?: boolean,
      receiveShadow?: boolean
    }
  ){
    super()
    this._mesh = new THREE.Mesh(geometry, material)
    this._mesh.castShadow = options?.castShadow ?? false
    this._mesh.receiveShadow = options?.receiveShadow ?? false
  }

  onAdd(gameObject: GameObject): void {
    super.onAdd(gameObject)
    gameObject.obj.add(this._mesh)
  }

  onRemove(gameObject: GameObject): void {
    super.onRemove(gameObject)
    gameObject.obj.remove(this._mesh)
  }
}