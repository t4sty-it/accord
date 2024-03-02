import { Vector3Like } from "three";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/Component";
import { GameObject } from "../lib/Gameobject";
import { Vec3 } from "math/Vec3";

export class ExplodeOnContactBehavior extends Component {
  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly explosionFactory: () => GameObject,
    public readonly options: {
      blastRadius: number,
      strength: number,
    }
  ) {
    super()

    rb.onCollision((e) => {
      const scene = this.gameObject!.gameScene
      if (scene) {
        const pos = e.contact as Vector3Like
        const explo = explosionFactory()
        scene.addObject(explo)
        explo.obj.position.copy(pos)
        
        this.blast(e.contact)
        scene.removeObject(this.gameObject!)
      }
    })
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
        const impulse = b.position
          .vsub(origin)
          .scale(this.strength / (1 + (d2 / b2)))
        b.applyImpulse(impulse)
      }
    })
  }
}

