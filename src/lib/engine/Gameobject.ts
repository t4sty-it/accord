import * as THREE from 'three'
import { GameScene } from './GameScene'
import { Component } from './Component'

export class GameObject {

  public readonly obj = new THREE.Object3D() 
  
  public gameScene: GameScene | null = null
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

  destroy() {
    this.gameScene?.removeObject(this)
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
    this.gameScene = gameScene
    gameScene.scene.add(this.obj)
    this.components.forEach(c => c.start())
  }

  onRemove() {
    this.components.forEach(c => c.onDestroy())
    this.gameScene?.scene.remove(this.obj)
    this.gameScene = null
  }

  getComponent<T extends Component>(name: string): T {
    return this.components.find(c => c.name == name) as T
  }
}