import { Component } from "../lib/engine/Component";
import { Getter, value } from "../lib/fp/getter";
import { encodeDestroy } from "../lib/multiplayer/codec";
import { Connection } from "../lib/multiplayer/connection";

export class DestroyBroadcaster extends Component {

  constructor(
    private readonly conn: Connection,
    private readonly sendName?: Getter<string>
  ) {
    super()
  }

  onDestroy(): void {
    const gobj = this.gameObject!
    const obj = gobj.obj
    this.conn.multicast(
      encodeDestroy(
        this.sendName ? value(this.sendName) : gobj.name,
        obj.position,
        obj.quaternion,
        obj.scale
      )
    )
  }
}