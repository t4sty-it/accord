import * as THREE from 'three'
import { GameScene } from './GameScene'
import { Component } from './Component'

export class GameObject {

  public readonly obj = new THREE.Object3D() 
  
  public parent: GameScene | null = null
  private components: Component[] = []

  constructor(
    public name: string,
  ){}

  start() {
    this.components.forEach(c => c.start())
  }

  update(time: number): void {
    this.components.forEach(c => c.update(time))
  }

  render(): THREE.Object3D {
    return this.obj
  }

  addComponent(component: Component) {
    component.onAdd(this)
    this.components.push(component)
  }

  removeComponent(component: Component) {
    component.onRemove(this)
    this.components = this.components.filter(x => x != component)
  }

  onAdd(gameScene: GameScene) {
    this.parent = gameScene
    gameScene.scene.add(this.obj)
    this.components.forEach(c => c.start())
  }

  onRemove() {
    this.parent = null
  }
}