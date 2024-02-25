import { GameObject } from "../lib/Gameobject";
import { Component } from '../lib/Component';
import { Body, Vec3, World } from "cannon-es";

export type CollisionHandler = (e: {body: Body, contact: Vec3}) => void

export class RigidBodyComponent implements Component {
  name: 'collider' = 'collider'

  private parent: GameObject | null = null

  private get world(): World | null {
    return this.parent?.parent?.world ?? null
  }
  
  private collisionHandlers: CollisionHandler[] = []

  constructor(
    public readonly body: Body
  ){
    this.body.addEventListener('collision', (e: {body: Body, contact: Vec3}) => {
      this.collisionHandlers.forEach(h => h(e))
    })
  }

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

  onCollision(cb: CollisionHandler): void {
    this.collisionHandlers.push(cb)
  }
}