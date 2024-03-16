import { BODY_TYPES } from "cannon-es";
import { TransformBroadcaster } from "../../behaviors/TransformBroadcaster";
import { TransformReceiver } from "../../behaviors/TransformReceiver";
import { RigidBodyComponent } from "../../components/RigidBodyComponent";
import { GameObject } from "../../lib/engine/Gameobject";
import { Connection } from "../../lib/multiplayer/connection";
import { SpawnBroadcaster } from "../../behaviors/SpawnBroadcaster";
import { DestroyBroadcaster } from "../../behaviors/DestroyBroadcaster";
import { DestroyReceiver } from "../../behaviors/DestroyReceiver";
import { Getter } from "../../lib/fp/getter";

export function connectObject(
  owner: 'localOwner' | 'remoteOwner',
  obj: GameObject,
  conn: Connection,
  sendName?: Getter<string>
): GameObject {
  if (owner == 'localOwner') return connectLocal(obj, conn, sendName)
  else return connectRemote(obj, conn, sendName)
}

function connectLocal(obj: GameObject, conn: Connection, sendName?: Getter<string>) {
  obj.addComponent(new SpawnBroadcaster(conn, sendName))
  obj.addComponent(new TransformBroadcaster(conn, sendName))
  obj.addComponent(new DestroyBroadcaster(conn, sendName))
  return obj
}

function connectRemote(obj: GameObject, conn: Connection, receiveName?: Getter<string>) {
  const rb = obj.getComponent('rigidBody') as RigidBodyComponent
  rb.body.type = BODY_TYPES.KINEMATIC
  obj.addComponent(new TransformReceiver(conn, rb.body, receiveName))
  obj.addComponent(new DestroyReceiver(conn, rb.body))
  return obj
}