import { GameObject } from "../lib/Gameobject";
import { Component } from '../lib/Component';
import { Body, Vec3, World } from "cannon-es";

export type CollisionHandler = (e: {body: Body, contact: Vec3}) => void

export class RigidBodyComponent extends Component {
  name: 'collider' = 'collider'

  private get world(): World | null {
    return this.gameObject?.parent?.world ?? null
  }
  
  private collisionHandlers: CollisionHandler[] = []

  constructor(
    public readonly body: Body
  ){
    super()
    this.body.addEventListener('collide', (e: {body: Body, contact: Vec3}) => {
      this.collisionHandlers.forEach(h => h(e))
    })
  }

  start(): void {
    this.world?.addBody(this.body)
  }
  
  update(_time: number): void {
    this.gameObject?.obj.position.copy(this.body.position)
    this.gameObject?.obj.quaternion.copy(this.body.quaternion)
  }

  onRemove(_from: GameObject): void {
    this.world?.removeBody(this.body)
  }

  onCollision(cb: CollisionHandler): void {
    this.collisionHandlers.push(cb)
  }
}