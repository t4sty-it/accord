import * as THREE from 'three';
import { GameObject } from '../lib/Gameobject';
import { TransformComponent } from '../components/TransformComponent';
import { Body, Box, Cylinder, Material, Sphere, Vec3 } from 'cannon-es';
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { CameraComponent } from '../components/CameraComponent';
import { JumpBehavior } from '../behaviors/JumpBehavior';
import { InputComponent } from '../components/InputComponent';
import { RunBehavior } from '../behaviors/RunBehavior';
import { SteerBehavior } from '../behaviors/SteerBehavior';

export const cameraMan = (camera: THREE.Camera) => {
  const cameraMan = new GameObject('cameraman')
  // cameraMan.addComponent(new TransformComponent(new THREE.Vector3(0, 0, 2)))
  cameraMan.addComponent(new CameraComponent(camera))
  const rb = new RigidBodyComponent(
    new Body({
      shape: new Box(new Vec3(0.1, 0.1, 0.1)),
      mass: 5,
      position: new Vec3(0, 1, 2),
      material: new Material({friction: 0.1, restitution: 0})
    })
  )
  cameraMan.addComponent(rb)

  const jumpInput = new InputComponent('Space', { type: 'temporary' })
  cameraMan.addComponent(jumpInput)
  cameraMan.addComponent(new JumpBehavior({rb, input: jumpInput, strength: 20}))

  const runInput = new InputComponent('ArrowUp', { type: 'persistent', inverse: 'ArrowDown', scale: -1 })
  cameraMan.addComponent(runInput)
  cameraMan.addComponent(new RunBehavior({rb, input: runInput, strength: 50}))

  const steerInput = new InputComponent('ArrowLeft', { type: 'persistent', inverse: 'ArrowRight'})
  cameraMan.addComponent(steerInput)
  cameraMan.addComponent(new SteerBehavior(rb, steerInput, 2.5))
  // cameraMan.addComponent(new RotationBehavior(new THREE.Euler(0, 0.001, 0)))
  return cameraMan
}
