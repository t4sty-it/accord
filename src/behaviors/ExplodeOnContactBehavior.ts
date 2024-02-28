import { Vector3, Vector3Like } from "three";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/Component";
import { GameObject } from "../lib/Gameobject";

export class ExplodeOnContactBehavior extends Component {
  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly explosionFactory: () => GameObject
  ) {
    super()

    rb.onCollision((e) => {
      const scene = this.gameObject!.parent
      if (scene) {
        scene.removeObject(this.gameObject!)
        const pos = e.contact as Vector3Like
        const explo = explosionFactory()
        scene.addObject(explo)
        explo.obj.position.copy(pos)
      }
    })
  }
}