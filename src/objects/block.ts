import { Body, Box, Material, Vec3 } from "cannon-es"
import { MeshComponent } from "../components/MeshComponent"
import { RigidBodyComponent } from "../components/RigidBodyComponent"
import { GameObject } from "../lib/Gameobject"
import * as THREE from 'three'
import { InputComponent } from "../components/InputComponent"
import { JumpBehavior } from "../behaviors/JumpBehavior"
import { RunBehavior } from "../behaviors/RunBehavior"

export function Block() {
  const block = new GameObject('block')

  block.addComponent(new MeshComponent(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshLambertMaterial({
      color: 0xff0000
    }),
    { castShadow: true }
  ))
  
  const rb = new RigidBodyComponent(
    new Body({
      mass: 5,
      shape: new Box(new Vec3(0.1, 0.1, 0.1)),
      position: new Vec3(0, 1, 0),
      material: new Material({friction: 0.01})
    })
  )

  block.addComponent(rb)

  // const jumpInput = new InputComponent('ArrowUp', {type: 'temporary'})
  
  // block.addComponent(jumpInput)
  // block.addComponent(new JumpBehavior({rb, input: jumpInput, strength: 20}))

  // const run = new InputComponent('ArrowUp', { type: 'persistent' })
  // block.addComponent(run)
  // block.addComponent(new RunBehavior({rb, input: run, strength: 50}))

  return block
}
