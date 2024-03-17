import { Object3D, QuaternionLike, Vector3Like } from "three"

export type Transform = {
  position: Vector3Like
  rotation: QuaternionLike
  scale: Vector3Like
}

export function apply(transform: Transform, obj: Object3D): void {
  obj.position.copy(transform.position)
  obj.quaternion.copy(transform.rotation)
  obj.scale.copy(transform.scale)
}