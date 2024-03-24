import * as THREE from 'three'
import { MeshComponent } from "../components/MeshComponent"
import { GameObject } from "../lib/engine/Gameobject"
import { RigidBodyComponent } from '../components/RigidBodyComponent'
import { BODY_TYPES, Body, Box, Material, Vec3 } from 'cannon-es'

export function Mate(name: string) {
  const block = new GameObject(name)

  block.addComponent(new MeshComponent(
    {
      geometry: new THREE.BoxGeometry(0.6, 0.6, 0.6),
      material: new THREE.MeshLambertMaterial({
        color: 0xff0000
      })
    },
    { castShadow: true }
  ))
  
  const rb = new RigidBodyComponent(
    new Body({
      type: BODY_TYPES.KINEMATIC,
      mass: 15,
      shape: new Box(new Vec3(0.3, 0.3, 0.3)),
      position: new Vec3(0, 1, 0),
      material: new Material({friction: 0.1})
    })
  )

  block.addComponent(rb)

  return block
}