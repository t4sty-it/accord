import * as THREE from 'three'

export interface Component {
  name: string
  start(): void
  update(time: number): void
  onAdd(to: GameObject): void
  onRemove(from: GameObject): void
}

export class GameObject {
  public readonly obj = new THREE.Object3D() 
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
}