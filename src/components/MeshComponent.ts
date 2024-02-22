import * as THREE from 'three'
import { Component, GameObject } from '../lib/Gameobject'

export class MeshComponent implements Component {
  name: 'mesh' = 'mesh'

  private _mesh: THREE.Mesh
  public get mesh() { return this._mesh }

  constructor(
    public readonly geometry: THREE.BufferGeometry,
    public readonly material: THREE.Material
  ){
    this._mesh = new THREE.Mesh(geometry, material)
  }

  start(){}
  update(time: number){}

  onAdd(gameObject: GameObject): void {
    gameObject.obj.add(this._mesh)
  }

  onRemove(gameObject: GameObject): void {
    gameObject.obj.remove(this._mesh)
  }
}