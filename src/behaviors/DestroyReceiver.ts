import { Object3D, QuaternionLike, Vector3Like } from "three";
import { Component } from "../lib/engine/Component";
import { Connection } from "../lib/multiplayer/connection";
import { MessageType, decodeDestroy, getMessageType } from "../lib/multiplayer/codec";
import { Body } from "cannon-es";

export class DestroyReceiver extends Component {
  constructor(
    public readonly connection: Connection,
    public readonly transform: Object3D | Body,
    public readonly receiveName?: string
  ) {
    super()

    connection.on('mate:data', (sender, msg) => {
      if (getMessageType(msg) == MessageType.Destroy) {
        const [name, ...transform] = decodeDestroy(msg)
        console.log('RECEIVE DESTROY', name)
        if (name == (this.receiveName ?? this.gameObject?.name)) {
          this.updateTransform(...transform)
          setTimeout(() => this.gameObject?.destroy())
        }
      }
    })
  }

  private updateTransform(pos: Vector3Like, rot: QuaternionLike, scl: Vector3Like): void {
    this.transform.position.set(pos.x, pos.y, pos.z)
    this.transform.quaternion.set(rot.x, rot.y, rot.z, rot.w)
  }

}