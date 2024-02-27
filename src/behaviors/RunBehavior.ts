import * as THREE from 'three'
import { InputComponent } from "../components/InputComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/Component";
import { Vec3 } from 'cannon-es';

export class RunBehavior extends Component {
  name = 'run'

  public readonly rb: RigidBodyComponent
  public readonly input: InputComponent
  public readonly strength: number

  private u = new Vec3(0, 0, 1)

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
    this.rb.body.applyForce(this.forward())
  }

  private forward(): Vec3 {
    return this.rb.body.quaternion
      .vmult(this.u)
      .scale(this.input.value * this.strength)
  }
}