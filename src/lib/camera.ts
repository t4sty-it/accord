import * as THREE from 'three'

export function useCamera({
  fov,
  aspect,
  initialPosition,
}: {
  fov: number
  aspect: number,
  initialPosition: THREE.Vector3
}) {
  const camera = new THREE.PerspectiveCamera(fov, aspect, 0.01, 10)
  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z)

  return camera
}