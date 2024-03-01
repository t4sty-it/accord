import * as THREE from 'three'
import { MeshComponent } from "../components/MeshComponent";
import { GameObject } from "../lib/Gameobject";
import { VanishBehavior } from '../behaviors/VanishBehavior';
import { GrowBehavior } from '../behaviors/GrowBehavior';

const exploGeometry = new THREE.SphereGeometry(.01)
const exploMaterial = new THREE.MeshToonMaterial({color: 0xff4400, opacity: 0.7, transparent: true})

export function Explosion() {
  const obj = new GameObject('explosion')

  obj.addComponent(new MeshComponent(
    exploGeometry,
    exploMaterial
  ))

  obj.addComponent(new GrowBehavior(1.25))

  obj.addComponent(new VanishBehavior(200))

  return obj
}