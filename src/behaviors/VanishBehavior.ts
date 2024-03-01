import { Component } from "../lib/Component";

export class VanishBehavior extends Component {

  constructor(
    public timeout: number
  ) {
    super()

    setTimeout(() => {
      this.gameObject?.gameScene?.removeObject(this.gameObject)
    }, timeout);
  }
}