import * as THREE from 'three'
import { GameScene } from "./lib/GameScene";
import { useCamera } from './lib/camera';
import { GameObject } from './lib/Gameobject';
import { MeshComponent } from './components/MeshComponent';
import { RotationBehavior } from './components/RotationBehavior';
import { TransformComponent } from './components/TransformComponent';
import { LightComponent } from './components/LightComponent';
import { BODY_TYPES, Body, Box, Plane, Quaternion, Shape, Vec3, World } from 'cannon-es';
import { RigidBodyComponent } from './components/RigidBodyComponent';

const camera = useCamera({
  fov: 70,
  aspect: window.innerWidth / window.innerHeight,
  initialPosition: new THREE.Vector3(0, 0, 2)
})

const scene = new GameScene({
  camera,
  world: new World({gravity: new Vec3(0, -9.82, 0)}),
  mountOn: document.body
})

const light = new GameObject('light')
light.addComponent(new TransformComponent(
  new THREE.Vector3(0, 0.3, 1)
))
light.addComponent(new MeshComponent(
  new THREE.SphereGeometry(0.01),
  new THREE.MeshBasicMaterial({
    color: 0xffffff
  })
))
light.addComponent(new LightComponent(
  new THREE.PointLight()
))

scene.addObject(light)

const block = new GameObject('block')
block.addComponent(new TransformComponent(
  new THREE.Vector3(0, 0, 0)
))
block.addComponent(new MeshComponent(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  new THREE.MeshLambertMaterial({
    color: 0xff0000
  })
))

block.addComponent(new RigidBodyComponent(
  new Body({
    mass: 5,
    shape: new Box(new Vec3(0.1, 0.1, 0.1))
  })
))

// block.addComponent(new RotationBehavior(new THREE.Euler(0, 0.001, 0)))

scene.addObject(block)

const ground = new GameObject('ground')
ground.addComponent(new MeshComponent(
  new THREE.PlaneGeometry(1000, 1000),
  new THREE.MeshBasicMaterial({color: 0xffffff})
))

ground.addComponent(new RigidBodyComponent(
  new Body({
    type: BODY_TYPES.STATIC,
    shape: new Plane(),
    quaternion: new Quaternion().setFromEuler(-Math.PI/2, 0, 0), // face up
    position: new Vec3(0, -1, 0)
  })
))

scene.addObject(ground)