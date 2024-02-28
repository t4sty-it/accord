import * as THREE from 'three';
import { GameObject } from '../lib/Gameobject';
import { Body, Box, Material, Vec3 } from 'cannon-es';
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { CameraComponent } from '../components/CameraComponent';
import { JumpBehavior } from '../behaviors/JumpBehavior';
import { InputComponent } from '../components/InputComponent';
import { RunBehavior } from '../behaviors/RunBehavior';
import { SteerBehavior } from '../behaviors/SteerBehavior';
import { MeshComponent } from '../components/MeshComponent';
import { StrafeBehavior } from '../behaviors/StrafeBehavior';

export const cameraMan = (camera: THREE.Camera) => {
  const cameraMan = new GameObject('cameraman')
  // cameraMan.addComponent(new TransformComponent(new THREE.Vector3(0, 0, 2)))
  cameraMan.addComponent(new CameraComponent(camera))
  const body = new Body({
    shape: new Box(new Vec3(0.2, 0.1, 0.2)),
    mass: 5,
    position: new Vec3(0, 1, 2),
    material: new Material({friction: 0, restitution: 0.5})
  })
  body.linearDamping = 0.99
  body.angularDamping = 0.99

  const rb = new RigidBodyComponent(body)
  cameraMan.addComponent(rb)

  const mesh = new MeshComponent(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    new THREE.MeshBasicMaterial({color: 0x0000ff}),
    { castShadow: true }
  )

  cameraMan.addComponent(mesh)

  const jumpInput = new InputComponent('Space', { type: 'temporary' })
  cameraMan.addComponent(jumpInput)
  cameraMan.addComponent(new JumpBehavior({rb, input: jumpInput, strength: 20}))

  const runInput = new InputComponent('ArrowUp', { type: 'persistent', inverse: 'ArrowDown', scale: -1 })
  cameraMan.addComponent(runInput)
  cameraMan.addComponent(new RunBehavior({rb, input: runInput, strength: 50}))

  const steerInput = new InputComponent('ArrowLeft', { type: 'persistent', inverse: 'ArrowRight', scale: -1})
  cameraMan.addComponent(steerInput)
  cameraMan.addComponent(new StrafeBehavior(rb, steerInput, 50))
  // cameraMan.addComponent(new SteerBehavior(rb, steerInput, 2.5))
  // cameraMan.addComponent(new RotationBehavior(new THREE.Euler(0, 0.001, 0)))
  return cameraMan
}
