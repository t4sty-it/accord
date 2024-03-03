import { Component } from '@engine';

export interface InputConfig {
  type: 'temporary' | 'persistent',
  alternate?: string,
  inverse?: string,
  inverseAlternate?: string,
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
    else {
      this.bindMouse()
    }
  }

  update(_time: number): void {
    if (this.isKeyboardInput) {
      this.updateKeyboard()
    }
    else {
      this.updateMouse()
    }
  }

  private bindKeyboard() {
    window.addEventListener('keydown', e => {
      if(e.code == this.axis || e.code == this.config.alternate) {
        this._value = this.config.scale ?? 1
        this._counter = 1
      }

      if (e.code == this.config.inverse || e.code == this.config.inverseAlternate) {
        this._value = -(this.config.scale ?? 1)
        this._counter = 1
      }
    })

    window.addEventListener('keyup', e => {
      if(
        [
          this.axis, this.config.inverse,
          this.config.alternate, this.config.inverseAlternate
        ].includes(e.code)
      ) {
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

  private bindMouse() {
    window.addEventListener('mousedown', e => {
      const buttonListened = parseInt(this.axis.replace('Mouse', ''))
      if (buttonListened == e.button) {
        this._value = 1
        this._counter = 1
      }
    })

    window.addEventListener('mouseup', e => {
      const buttonListened = parseInt(this.axis.replace('Mouse', ''))
      if (buttonListened == e.button) {
        this._value = 0
        this._counter = 0
      }
    })
  }

  private updateMouse() {
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