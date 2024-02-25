import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from '../lib/Component';

export class JumpBehavior extends Component {
  name: 'JumpBehavior' = 'JumpBehavior'

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly jump: InputComponent,
  ){ super() }

  update(_time: number): void {
    if (this.jump.value == 1) {
      this.rb.body.applyImpulse(new Vec3(0, 20, 0))
      console.log('UP')
    }
  }
}