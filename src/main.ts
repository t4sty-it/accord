import * as THREE from 'three'
import { GameScene } from "./lib/GameScene";
import { GameObject } from './lib/Gameobject';
import { MeshComponent } from './components/MeshComponent';
import { TransformComponent } from './components/TransformComponent';
import { LightComponent } from './components/LightComponent';
import { BODY_TYPES, Body, Plane, Quaternion, Vec3, World } from 'cannon-es';
import { RigidBodyComponent } from './components/RigidBodyComponent';
import { Block } from './objects/block';
import { cameraMan } from './objects/cameraMan';

const scene = new GameScene({
  world: new World({gravity: new Vec3(0, -9.82, 0)}),
  mountOn: document.body
})


const camera = new THREE.PerspectiveCamera(70)
scene.setCamera(camera)
scene.addObject(cameraMan(camera))

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

const block = Block()

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
    position: new Vec3(0, -0.1, 0)
  })
))

scene.addObject(ground)