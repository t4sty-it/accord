import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "@engine";

export class StrafeBehavior extends Component {

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly input: InputComponent,
    public readonly strength: number
  ){ super() }

  update(_time: number): void {
    this.rb.body.applyForce(
      this.rb.body.quaternion
        .vmult(Vec3.UNIT_X)
        .scale(this.input.value * this.strength)
    )
  }
}