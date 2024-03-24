import * as THREE from 'three'
import { MeshComponent } from "../components/MeshComponent";
import { GameObject } from "@engine";
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { Body, Sphere } from 'cannon-es';
import { ExplodeOnContactBehavior } from '../behaviors/ExplodeOnContactBehavior';
import { Explosion } from './explosion';
import { AudioSourceComponent } from '../components/AudioSourceComponent';
import gunShotSfx from '../assets/gunshot.mp3'


const bulletMaterial = new THREE.MeshStandardMaterial({color: 0x44ff44})
const bulletGeometry = new THREE.SphereGeometry(0.03)

export function Bullet(
  id?: string
) {
  const bullet = new GameObject('bullet-' + (id ?? ('' + Math.random()).slice(2)))

  bullet.addComponent(new MeshComponent({
    geometry: bulletGeometry,
    material: bulletMaterial
  }))

  bullet.addComponent(new AudioSourceComponent(gunShotSfx))

  const rb = new RigidBodyComponent(
    new Body({
      mass: 0.01,
      shape: new Sphere(0.03),
    })
  )
  bullet.addComponent(rb)

  bullet.addComponent(new ExplodeOnContactBehavior(
    rb, Explosion,
    {
      blastRadius: 2,
      strength: 200
    }
  ))

  return bullet
}