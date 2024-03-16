import { Component } from "../lib/engine/Component";
import { encodeTransform } from "../lib/multiplayer/codec";
import { Connection } from "../lib/multiplayer/connection";

export class TransformBroadcaster extends Component {
  constructor(
    public readonly connection: Connection,
    public readonly sendName?: string | (() => string)
  ) { super() }

  update(_time: number): void {
    if (this.gameObject) {
      this.connection.multicast(encodeTransform(
        this.getName(),
        this.gameObject.obj.position,
        this.gameObject.obj.quaternion,
        this.gameObject.obj.scale
      ))
    }
  }

  private getName() {
    return typeof this.sendName === 'undefined'
      ? this.gameObject!.name
      : typeof this.sendName == 'string'
        ? this.sendName
        : this.sendName();
  }
}