import { Body, Box, Material, Vec3 } from "cannon-es"
import { MeshComponent } from "../components/MeshComponent"
import { RigidBodyComponent } from "../components/RigidBodyComponent"
import { GameObject } from "../lib/Gameobject"
import * as THREE from 'three'

export function Block() {
  const block = new GameObject('block')

  block.addComponent(new MeshComponent(
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.MeshLambertMaterial({
      color: 0xff0000
    }),
    { castShadow: true }
  ))
  
  const rb = new RigidBodyComponent(
    new Body({
      mass: 15,
      shape: new Box(new Vec3(0.3, 0.3, 0.3)),
      position: new Vec3(0, 1, 0),
      material: new Material({friction: 0.1})
    })
  )

  block.addComponent(rb)

  return block
}
