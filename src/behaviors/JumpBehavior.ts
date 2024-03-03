import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from '@engine';

export class JumpBehavior extends Component {
  name: 'JumpBehavior' = 'JumpBehavior'
  public readonly rb: RigidBodyComponent
  public readonly input: InputComponent
  public readonly strength: number
  public readonly charges: number

  private chargesLeft = 0;

  constructor({
    rb,
    input,
    strength,
    charges = 1
  }: {
    rb: RigidBodyComponent,
    input: InputComponent,
    strength: number,
    charges?: number
  }){
    super()
    this.rb = rb
    this.input = input
    this.strength = strength
    this.charges = charges
    rb.onCollision(() => {
      this.chargesLeft = this.charges
      console.log('charged up')
    })
  }

  update(_time: number): void {
    if (this.input.value == 1 && this.chargesLeft > 0) {
      this.rb.body.applyImpulse(new Vec3(0, this.strength, 0))
      this.chargesLeft--
    }
  }
}