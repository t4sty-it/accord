import { Body, Box, Material, Vec3 } from "cannon-es"
import { MeshComponent } from "../components/MeshComponent"
import { RigidBodyComponent } from "../components/RigidBodyComponent"
import { GameObject } from "@engine"
import * as THREE from 'three'

export function Block(name: string, initPos: THREE.Vector3Like) {
  const block = new GameObject(name)

  block.addComponent(new MeshComponent(
    {
      geometry: new THREE.BoxGeometry(0.6, 0.6, 0.6),
      material: new THREE.MeshLambertMaterial({
        color: 0xff0000
      }),
    },
    { castShadow: true }
  ))
  
  const rb = new RigidBodyComponent(
    new Body({
      mass: 15,
      shape: new Box(new Vec3(0.3, 0.3, 0.3)),
      position: new Vec3(initPos.x, initPos.y, initPos.z),
      material: new Material({friction: 0.1})
    })
  )

  block.addComponent(rb)

  return block
}
