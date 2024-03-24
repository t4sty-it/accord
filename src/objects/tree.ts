import { Body, Cylinder, Vec3 } from "cannon-es";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { GameObject } from "../lib/engine/Gameobject";
import { MeshComponent } from "../components/MeshComponent";
import { CylinderGeometry, MeshPhongMaterial } from "three";

const treeGeometry = new CylinderGeometry(0.5, 0.5, 3, 8)
const treeMaterial = new MeshPhongMaterial({
  color: 0x552200
})

export function Tree(id?: string): GameObject {

  const tree = new GameObject('tree-' + (id ?? (Math.random() + '').slice(2)))

  const rb = new RigidBodyComponent(new Body({
    shape: new Cylinder(0.5, 0.5, 3, 8),
    position: new Vec3(0, 1.5, 0)
  }))

  tree.addComponent(rb)

  const mesh = new MeshComponent({
    geometry: treeGeometry,
    material: treeMaterial,
  })

  tree.addComponent(mesh)

  return tree
}