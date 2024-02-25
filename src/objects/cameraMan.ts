import * as THREE from 'three';
import { GameObject } from '../lib/Gameobject';
import { TransformComponent } from '../components/TransformComponent';
import { Body, Sphere, Vec3 } from 'cannon-es';
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { CameraComponent } from '../components/CameraComponent';
import { JumpBehavior } from '../behaviors/JumpBehavior';
import { InputComponent } from '../components/InputComponent';

export const cameraMan = (camera: THREE.Camera) => {
  const cameraMan = new GameObject('cameraman')
  // cameraMan.addComponent(new TransformComponent(new THREE.Vector3(0, 0, 2)))
  cameraMan.addComponent(new CameraComponent(camera))
  const rb = new RigidBodyComponent(
    new Body({
      shape: new Sphere(.1),
      mass: 5,
      position: new Vec3(0, 0.3, 2)
    })
  )
  cameraMan.addComponent(rb)

  const jump = new InputComponent('Space', { type: 'temporary' })
  cameraMan.addComponent(jump)

  cameraMan.addComponent(new JumpBehavior({rb, input: jump, strength: 20}))
  // cameraMan.addComponent(new RotationBehavior(new THREE.Euler(0, 0.001, 0)))
  return cameraMan
}
