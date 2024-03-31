import * as THREE from 'three';
import { GameObject } from '@engine';
import { Body, Cylinder, Material, Quaternion, Vec3 } from 'cannon-es';
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { CameraComponent } from '../components/CameraComponent';
import { JumpBehavior } from '../behaviors/JumpBehavior';
import { InputComponent } from '../components/InputComponent';
import { RunBehavior } from '../behaviors/RunBehavior';
import { MeshComponent } from '../components/MeshComponent';
import { StrafeBehavior } from '../behaviors/StrafeBehavior';
import { PointerLockController } from '../behaviors/PointerLockController';
import { ShootBehavior } from '../behaviors/ShootBehavior';
import { Bullet } from './bullet';
import { Connection } from '../lib/multiplayer/connection';
import { connectObject } from './configurators/connectObject';
import { PlayerStore } from '../stores/PlayerStore';
import { DamageOnHit } from '../behaviors/DamageOnHit';
import { RespawnWhenDead } from '../behaviors/RespawnWhenDead';

export const cameraMan = (camera: THREE.Camera, player: PlayerStore, connection?: Connection) => {
  const cameraMan = new GameObject('cameraman')
  cameraMan.addComponent(new CameraComponent(camera))
  const body = new Body({
    shape: new Cylinder(0.7, 0.7, 1.70, 8),
    mass: 80,
    position: new Vec3(Math.random() * 4, 1, 2),
    material: new Material({friction: 0, restitution: 0.5})
  })
  body.linearDamping = 0.99
  body.angularDamping = 0.99

  const rb = new RigidBodyComponent(body)
  cameraMan.addComponent(rb)

  const mesh = new MeshComponent(
    {
      geometry: new THREE.CylinderGeometry(0.7, 0.7, 1.70),
      material: new THREE.MeshBasicMaterial({color: 0x0000ff}),
    },
    { castShadow: true }
  )

  cameraMan.addComponent(mesh)

  const jumpInput = new InputComponent('Space', { type: 'temporary' })
  cameraMan.addComponent(jumpInput)
  cameraMan.addComponent(new JumpBehavior({rb, input: jumpInput, strength: 700}))

  const runInput = new InputComponent('ArrowUp', {
    type: 'persistent',
    inverse: 'ArrowDown',
    alternate: 'KeyW',
    inverseAlternate: 'KeyS',
    scale: -1
  })
  cameraMan.addComponent(runInput)
  cameraMan.addComponent(new RunBehavior({rb, input: runInput, strength: 2000}))

  const strafeInput = new InputComponent('ArrowLeft', {
    type: 'persistent',
    inverse: 'ArrowRight',
    alternate: 'KeyA',
    inverseAlternate: 'KeyD',
    scale: -1
  })
  cameraMan.addComponent(strafeInput)
  cameraMan.addComponent(new StrafeBehavior(rb, strafeInput, 2000))

  cameraMan.addComponent(new PointerLockController(
    rb, camera, { torqueFactor: 150 }
  ))

  const shootInput = new InputComponent('Mouse0', { type: 'temporary' })
  const bulletOrigin = {
    get position(): Vec3 {
      return rb.body.position.vadd(
        rb.body.quaternion.vmult(Vec3.UNIT_Z.scale(0.8)))
    },
    get quaternion(): Quaternion {
      // Combine camera pitch with its parent yaw
      const q = new THREE.Quaternion()
      q.multiplyQuaternions(cameraMan.obj.quaternion, camera.quaternion)
      // Convert to cannon-es quaternion
      return new Quaternion(q.x, q.y, q.z, q.w)
    }
  }
  cameraMan.addComponent(shootInput)

  const bulletFactory = connection
    ? () => connectObject('localOwner', Bullet(), connection)
    : () => Bullet()

  cameraMan.addComponent(new ShootBehavior(
    bulletOrigin,
    shootInput,
    bulletFactory,
    {
      strength: .25
    }
  ))

  cameraMan.addComponent(new DamageOnHit(
    rb,
    player
  ));

  cameraMan.addComponent(new RespawnWhenDead({
    respawnLocation: new THREE.Vector3(0, 3, 0)
  }))
  
  return cameraMan
}
