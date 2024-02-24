import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component, GameObject } from "../lib/Gameobject";

export class JumpBehavior implements Component {
  name: 'JumpBehavior' = 'JumpBehavior'

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly jump: InputComponent,
  ){}

  start(): void {}

  update(time: number): void {
    if (this.jump.value == 1) {
      this.rb.body.applyImpulse(new Vec3(0, 20, 0))
      console.log('UP')
    }
  }

  onAdd(to: GameObject): void {}
  onRemove(from: GameObject): void {}
}