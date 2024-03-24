import * as THREE from 'three'
import { MeshComponent } from "../components/MeshComponent"
import { GameObject } from "@engine"
import { RigidBodyComponent } from '../components/RigidBodyComponent'
import { BODY_TYPES, Body, Material, Plane, Quaternion, Vec3 } from 'cannon-es'

const ground = new GameObject('ground')
ground.addComponent(new MeshComponent({
    geometry: new THREE.PlaneGeometry(1000, 1000),
    material: new THREE.MeshLambertMaterial({color: 0xffffff}),
  },
  { receiveShadow: true }
))

ground.addComponent(new RigidBodyComponent(
  new Body({
    type: BODY_TYPES.STATIC,
    shape: new Plane(),
    quaternion: new Quaternion().setFromEuler(-Math.PI/2, 0, 0), // face up
    position: new Vec3(0, -0.1, 0),
    material: new Material({friction: 0.1, restitution: 0})
  })
))

export { ground }