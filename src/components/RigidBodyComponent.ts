import { Component, GameObject } from "@engine";
import { Body, Vec3, World } from "cannon-es";

type CannonEsCollisionEvent = {
  body: Body,
  target: {
    position: Vec3,
    force: Vec3,
    torque: Vec3
  }
}

export type CollisionEvent = CannonEsCollisionEvent & { gameObject: GameObject }

export type CollisionHandler = (e: CollisionEvent) => void

export class RigidBodyComponent extends Component {
  name = 'rigidBody'

  private get world(): World | null {
    return this.gameObject?.gameScene?.world ?? null
  }
  
  private collisionHandlers: CollisionHandler[] = []

  constructor(
    public readonly body: Body
  ){
    super()
    this.body.addEventListener('collide', (e: CannonEsCollisionEvent) => {
      if (this.gameObject) {
        this.collisionHandlers.forEach(h => h({...e, gameObject: rbcache.get(e.body)?.getGameObject()!}))
      }
    })
  }

  start(): void {
    this.world?.addBody(this.body)
    rbcache.set(this.body, this!)
  }
  
  update(_time: number): void {
    this.gameObject?.obj.position.copy(this.body.position)
    this.gameObject?.obj.quaternion.copy(this.body.quaternion)
  }

  onRemove(_from: GameObject): void {
    this.world?.removeBody(this.body)
    rbcache.delete(this.body)
  }

  onCollision(cb: CollisionHandler): void {
    this.collisionHandlers.push(cb)
  }

  public static findWithBody(body: Body): RigidBodyComponent | undefined {
    return rbcache.get(body)
  }
}

const rbcache = new WeakMap<Body, RigidBodyComponent>()