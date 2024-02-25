import { Vec3 } from "cannon-es";
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from '../lib/Component';

export class JumpBehavior extends Component {
  name: 'JumpBehavior' = 'JumpBehavior'
  public readonly rb: RigidBodyComponent
  public readonly input: InputComponent
  public readonly strength: number

  constructor({
    rb,
    input,
    strength
  }: {
    rb: RigidBodyComponent,
    input: InputComponent,
    strength: number
  }){
    super()
    this.rb = rb
    this.input = input
    this.strength = strength
  }

  update(_time: number): void {
    if (this.input.value == 1) {
      this.rb.body.applyImpulse(new Vec3(0, this.strength, 0))
      console.log('UP')
    }
  }
}