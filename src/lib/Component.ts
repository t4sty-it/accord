import { GameObject } from './Gameobject';

export interface Component {
  name: string;
  start(): void;
  update(time: number): void;
  onAdd(to: GameObject): void;
  onRemove(from: GameObject): void;
}
