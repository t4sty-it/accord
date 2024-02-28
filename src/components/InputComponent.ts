import { Component } from '../lib/Component';

export interface InputConfig {
  type: 'temporary' | 'persistent',
  inverse?: string,
  scale?: number
}

export class InputComponent extends Component {
  name = 'input'

  private _counter = 0
  private _value: number = 0
  public get value(): number { return this._value }

  private readonly isKeyboardInput: boolean

  constructor(
    public readonly axis: string,
    public readonly config: InputConfig
  ){
    super()
    this.isKeyboardInput = !axis.startsWith('Mouse')

    if (this.isKeyboardInput) {
      this.bindKeyboard()
    }
  }

  update(_time: number): void {
    if (this.isKeyboardInput) {
      this.updateKeyboard()
    }
  }

  private bindKeyboard() {
    window.addEventListener('keydown', e => {
      if(e.code == this.axis) {
        this._value = this.config.scale ?? 1
        this._counter = 1
      }

      if (e.code == this.config.inverse) {
        this._value = -(this.config.scale ?? 1)
        this._counter = 1
      }
    })

    window.addEventListener('keyup', e => {
      if(e.code == this.axis || e.code == this.config.inverse) {
        this._value = 0
        this._counter = 0
      }
    })
  }

  private updateKeyboard() {
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