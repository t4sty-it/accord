import * as THREE from 'three';

export function useScene({
  camera,
  update,
  mountOn,
}: {
  camera: THREE.Camera
  update: (time: number) => void,
  mountOn: HTMLElement
}) {

  const width = window.innerWidth, height = window.innerHeight;
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( width, height );
  renderer.setAnimationLoop( (time) => {
    update(time)
    renderer.render(scene, camera)
  } );

  mountOn.appendChild(renderer.domElement)

  return scene
}