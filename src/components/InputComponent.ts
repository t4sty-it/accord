import { Component, GameObject } from "../lib/Gameobject";

export interface InputConfig {
  type: 'temporary' | 'persistent'
} 

export class InputComponent implements Component {
  name = 'input'

  private _counter = 0
  private _value: number = 0
  public get value(): number { return this._value }

  constructor(
    public readonly axis: string,
    public readonly config: InputConfig
  ){
    window.addEventListener('keydown', e => {
      if(e.code == axis) {
        this._value = 1
        this._counter = 1
      }
    })

    window.addEventListener('keyup', e => {
      if(e.code == axis) {
        this._value = 0
        this._counter = 0
      }
    })
  }

  start(): void {}
  update(time: number): void {
    if (this.config.type == 'temporary') {
      if (this._value != 0 && this._counter == 0) {
        this._value = 0
      }

      if (this._counter > 0) {
        this._counter--
      }
    }
  }
  onAdd(to: GameObject): void {}
  onRemove(from: GameObject): void {}
}