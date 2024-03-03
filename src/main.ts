import * as THREE from 'three'
import { GameScene, GameObject } from "@engine";
import { MeshComponent } from './components/MeshComponent';
import { TransformComponent } from './components/TransformComponent';
import { LightComponent } from './components/LightComponent';
import { Vec3, World } from 'cannon-es';
import { Block } from './objects/block';
import { cameraMan } from './objects/cameraMan';
import { ground } from './objects/ground';

const scene = new GameScene({
  world: new World({gravity: new Vec3(0, -9.82, 0)}),
  mountOn: document.body
})

const camera = new THREE.PerspectiveCamera(70)
scene.setCamera(camera)
scene.addObject(cameraMan(camera))

const light = new GameObject('light')
light.addComponent(new TransformComponent(
  new THREE.Vector3(0, 1, 1)
))
light.addComponent(new MeshComponent(
  new THREE.SphereGeometry(0.01),
  new THREE.MeshBasicMaterial({
    color: 0xffffff
  })
))

light.addComponent(new LightComponent(
  new THREE.PointLight(0xffffff, 1),
  { castShadow: true, shadowQuality: 13 }
))

light.addComponent(new LightComponent(
  new THREE.AmbientLight(0xffdddd, 0.03)
))

scene.addObject(light)

const block = Block()
scene.addObject(block)

scene.addObject(ground)