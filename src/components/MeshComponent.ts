import * as THREE from 'three'
import { Component, GameObject } from '@engine'

export type MeshComponentOptions = {
  geometry: THREE.BufferGeometry,
  material: THREE.Material
}

export type MeshShadowOptions = {
  castShadow?: boolean,
  receiveShadow?: boolean,
}

export class MeshComponent extends Component {
  name: 'mesh' = 'mesh'

  private _mesh: THREE.Mesh
  public get mesh() { return this._mesh }

  constructor(
    meshOptions: MeshComponentOptions,
    shadowOptions?: {
      castShadow?: boolean,
      receiveShadow?: boolean
    }
  ){
    super()

    this._mesh = new THREE.Mesh(meshOptions.geometry, meshOptions.material)
    this._mesh.castShadow = shadowOptions?.castShadow ?? false
    this._mesh.receiveShadow = shadowOptions?.receiveShadow ?? false
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