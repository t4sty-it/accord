import { Component } from "../lib/engine/Component";
import { GameScene } from "../lib/engine/GameScene";

export class Finder<T> extends Component {

  private result: T | null = null

  constructor(
    private filter: (scene: GameScene) => T | null,
    private onResult: (result: T) => void
  ) { super() }

  update(_time: number): void {
    if (this.result == null && this.gameObject?.gameScene) {
      console.log('searching...')
      this.result = this.filter(this.gameObject.gameScene)
      if (this.result != null) {
        console.log('found', this.result)
        this.onResult(this.result)
        // this.gameObject.removeComponent(this)
      }
    }
  }
}