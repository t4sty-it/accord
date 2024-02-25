import { Component } from '../lib/Component';

export interface InputConfig {
  type: 'temporary' | 'persistent'
} 

export class InputComponent extends Component {
  name = 'input'

  private _counter = 0
  private _value: number = 0
  public get value(): number { return this._value }

  constructor(
    public readonly axis: string,
    public readonly config: InputConfig
  ){
    super()
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

  update(_time: number): void {
    if (this.config.type == 'temporary') {
      if (this._value != 0 && this._counter == 0) {
        this._value = 0
      }

      if (this._counter > 0) {
        this._counter--
      }
    }
  }
}