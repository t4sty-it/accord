import { Quaternion, Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/Component";
import { GameObject } from "../lib/Gameobject";

export class ShootBehavior extends Component {
  constructor(
    public readonly origin: {position: Vec3, quaternion: Quaternion},
    public readonly input: InputComponent,
    public readonly bulletFactory: () => GameObject,
    public readonly options: {
      strength: number
    }
  ) { super() }

  update(_time: number): void {
    if (this.input.value == 1) {
      const bullet = this.bulletFactory()
      this.gameObject?.gameScene?.addObject(bullet)

      const bulletRb = bullet.getComponent('rigidBody') as RigidBodyComponent
      setTimeout(() => {
        bulletRb.body.quaternion.copy(this.origin.quaternion)
        bulletRb.body.position.copy(
          this.origin.position
        )
        
        bulletRb.body.applyImpulse(
          this.origin.quaternion
            .vmult(Vec3.UNIT_Z)
            .scale(-this.options.strength)
        )
      })
    }
  }
}