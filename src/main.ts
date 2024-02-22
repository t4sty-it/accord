import * as THREE from 'three'
import { useScene } from "./lib/scene";
import { useCamera } from './lib/camera';
import { GameObject } from './lib/Gameobject';
import { MeshComponent } from './components/MeshComponent';
import { RotationBehavior } from './components/RotationBehavior';
import { TransformComponent } from './components/TransformComponent';
import { LightComponent } from './components/LightComponent';

const objects: GameObject[] = []

const camera = useCamera({
  fov: 70,
  aspect: window.innerWidth / window.innerHeight,
  initialPosition: new THREE.Vector3(0, 0, 2)
})

const scene = useScene({
  camera,
  update: time => objects.forEach(o => o.update(time)),
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

objects.push(light)

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

block.addComponent(new RotationBehavior(new THREE.Euler(0, 0.001, 0)))

objects.push(block)

objects.forEach(o => scene.add(o.render()))