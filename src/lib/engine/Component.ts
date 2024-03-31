import { GameObject } from './Gameobject';

export class Component {
  name: string = 'component'
  
  protected gameObject: GameObject | null = null
  getGameObject(){ return this.gameObject }

  start(): void {}
  update(_time: number): void {}
  
  onAdd(to: GameObject): void {
    this.gameObject = to
  }
  
  onRemove(_from: GameObject): void {
    this.gameObject = null
  }

  onDestroy(): void {}
}
