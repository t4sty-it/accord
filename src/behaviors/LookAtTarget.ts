import { Object3D, Vector3 } from "three";
import { Component } from "../lib/engine/Component";

export class LookAtTarget extends Component {

  private targetWorldPos: Vector3 = new Vector3()

  constructor(
    private target?: Object3D
  ) { super() }

  update(_time: number): void {
    if (this.gameObject?.obj && this.target) {
      this.target.getWorldPosition(this.targetWorldPos)
      this.gameObject.obj.lookAt(this.targetWorldPos)
    }
  }

  setTarget(target: Object3D) {
    this.target = target
  }

}