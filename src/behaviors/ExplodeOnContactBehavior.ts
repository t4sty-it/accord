import { Vector3Like } from "three";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component, GameObject } from "@engine"
import { Vec3 } from "cannon-es";

export type HitHandler = (obj: GameObject, k: number) => void

export class ExplodeOnContactBehavior extends Component {

  private exploPos: Vec3 | undefined

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly explosionFactory: () => GameObject,
    public readonly options: {
      blastRadius: number,
      strength: number,
      onHit?: HitHandler
    }
  ) {
    super()

    rb.onCollision((e) => {
      const scene = this.gameObject!.gameScene
      if (scene) {
        this.exploPos = e.target.position
        scene.removeObject(this.gameObject!)
      }
    })
  }

  private three2cannon(v: Vector3Like): Vec3 {
    return new Vec3().set(v.x, v.y, v.z)
  }

  onDestroy(): void {
    const pos: Vec3 = this.exploPos ?? this.three2cannon(this.gameObject!.obj.position)
    
    this.blast(pos)
    
    const explo = this.explosionFactory()
    this.gameObject?.gameScene?.addObject(explo)
    explo.obj.position.copy(pos)
  }

  private get strength() {
    return this.options.strength
  }

  private get blastRadius() {
    return this.options.blastRadius
  }

  private get world() {
    return this.gameObject?.gameScene?.world
  }

  private blast(origin: Vec3) {
    
    this.world?.bodies.forEach(b => {
      const d2 = b.position.distanceSquared(origin)
      const b2 = this.blastRadius*this.blastRadius
      
      if (d2 < b2) {
        const k = this.strength / (1 + (d2 / b2))
        const impulse = b.position
          .vsub(origin)
          .scale(k)
        b.applyImpulse(impulse)

        this.options.onHit?.call(this, RigidBodyComponent.findWithBody(b)!.getGameObject()!, k)
      }
    })
  }
}

