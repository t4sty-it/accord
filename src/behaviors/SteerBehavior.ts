import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/Component";

export class SteerBehavior extends Component {
  name = 'steer'

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly input: InputComponent,
    public readonly strength: number
  ){ super() }

  private u = new Vec3(0, 1, 0)
  private t = new Vec3(0, 0, 1)
  

  update(_time: number): void {
    const t = this.torque()
    this.rb.body.applyTorque(t)
    // if (Math.random() < 0.1) console.log(this.strafe())
    // this.rb.body.applyForce(this.strafe())
  }

  private torque(): Vec3 {
    return this.u.scale(this.strength * this.input.value)
  }

  // private strafe(): Vec3 {
  //   return this.rb.body.quaternion.vmult(this.t).vsub(this.rb.body.velocity)
  // }
}