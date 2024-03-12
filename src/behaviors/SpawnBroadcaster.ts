import { Component } from "../lib/engine/Component";
import { encodeSpawn } from "../lib/multiplayer/codec";
import { Connection } from "../lib/multiplayer/connection";

export class SpawnBroadcaster extends Component {
  private hasBroadcasted = false

  constructor(
    private readonly conn: Connection,
    private readonly sendName?: string
  ) { super() }

  update(_time: number): void {
    if (!this.hasBroadcasted) {
      this.hasBroadcasted = true
      const t = this.gameObject!.obj
      this.conn.multicast(encodeSpawn(this.sendName ?? this.gameObject!.name, t.position, t.quaternion, t.scale))
    }
  }
}