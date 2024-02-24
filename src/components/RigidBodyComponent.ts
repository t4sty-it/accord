import { Component, GameObject } from "../lib/Gameobject";
import { Body, World } from "cannon-es";

export class RigidBodyComponent implements Component {
  name: 'collider' = 'collider'

  private parent: GameObject | null = null

  private get world(): World | null {
    return this.parent?.parent?.world ?? null
  }

  constructor(
    public readonly body: Body
  ){}

  start(): void {
    this.world?.addBody(this.body)
  }
  
  update(time: number): void {
    this.parent?.obj.position.copy(this.body.position)
    this.parent?.obj.quaternion.copy(this.body.quaternion)
  }

  onAdd(to: GameObject): void {
    this.parent = to
  }
  onRemove(from: GameObject): void {
    this.parent = null
    this.world?.removeBody(this.body)
  }
}