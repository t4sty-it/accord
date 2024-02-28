import { Component } from "../lib/Component";

export class GrowBehavior extends Component {

  constructor(
    public factor: number
  ) {
    super()
  }

  update(_time: number): void {
    this.gameObject?.obj.scale.multiplyScalar(this.factor)
  }
}