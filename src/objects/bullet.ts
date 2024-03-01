import * as THREE from 'three'
import { MeshComponent } from "../components/MeshComponent";
import { GameObject } from "../lib/Gameobject";
import { RigidBodyComponent } from '../components/RigidBodyComponent';
import { Body, Sphere } from 'cannon-es';
import { ExplodeOnContactBehavior } from '../behaviors/ExplodeOnContactBehavior';
import { Explosion } from './explosion';


const bulletMaterial = new THREE.MeshStandardMaterial({color: 0x44ff44})
const bulletGeometry = new THREE.SphereGeometry(0.03)

export function Bullet() {
  const bullet = new GameObject('bullet')

  bullet.addComponent(new MeshComponent(
    bulletGeometry,
    bulletMaterial,
  ))

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