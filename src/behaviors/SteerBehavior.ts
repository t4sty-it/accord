import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "@engine";

export class SteerBehavior extends Component {
  name = 'steer'

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly input: InputComponent,
    public readonly strength: number
  ){ super() }

  private u = new Vec3(0, 1, 0)
  
  update(_time: number): void {
    const t = this.torque()
    this.rb.body.applyTorque(t)
  }

  private torque(): Vec3 {
    return this.u.scale(this.strength * this.input.value)
  }
}