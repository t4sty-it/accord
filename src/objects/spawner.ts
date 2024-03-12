import { SpawnReceiver } from "../behaviors/SpawnReceiver";
import { GameObject } from "../lib/engine/Gameobject";
import { Connection } from "../lib/multiplayer/connection";

export function Spawner(
  connection: Connection,
  factory: (name: string) => GameObject | null
) {
  const spawner = new GameObject('spawner')
  spawner.addComponent(new SpawnReceiver(connection, factory))

  return spawner
}