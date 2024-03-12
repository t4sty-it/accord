import { Component } from "../lib/engine/Component";
import { encodeDestroy } from "../lib/multiplayer/codec";
import { Connection } from "../lib/multiplayer/connection";

export class DestroyBroadcaster extends Component {

  constructor(
    private readonly conn: Connection,
    private readonly sendName?: string
  ) {
    super()
  }

  onDestroy(): void {
    console.log('SEND DESTROY', this.sendName ?? this.gameObject?.name)
    const gobj = this.gameObject!
    const obj = gobj.obj
    this.conn.multicast(
      encodeDestroy(
        this.sendName ?? gobj.name,
        obj.position,
        obj.quaternion,
        obj.scale
      )
    )
  }
}