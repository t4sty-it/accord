import { World } from 'cannon-es';
import * as THREE from 'three';
import { GameObject } from './Gameobject';

export class GameScene {
  public readonly camera
  public readonly scene = new THREE.Scene()
  public readonly world

  private objects: GameObject[] = []
  private renderer: THREE.WebGLRenderer

  constructor({camera, world, mountOn }: {
    camera?: THREE.Camera,
    world?: World,
    mountOn: HTMLElement
  }
  ){
    this.camera = camera ?? new THREE.PerspectiveCamera()
    this.world = world ?? new World()

    const width = mountOn.clientWidth, height = mountOn.clientHeight;
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( width, height );
    this.renderer.setAnimationLoop(this.animation.bind(this));
    mountOn.appendChild(this.renderer.domElement)

    window.addEventListener('resize', this.resize.bind(this))

    this.renderer.setClearColor(0x334455)
  }

  addObject(obj: GameObject) {
    this.objects.push(obj)
    obj.onAdd(this)
    obj.start()
  }

  removeObject(obj: GameObject) {
    this.objects = this.objects.filter(o => o != obj)
    obj.onRemove()
  }

  private resize() {
    const container = this.renderer.domElement.parentElement!
    const width = container.clientWidth
    const height = container.clientHeight
    this.renderer.setSize(width, height)
    ;(this.camera as THREE.PerspectiveCamera).aspect = width / height // TODO move into camera
    ;(this.camera as THREE.PerspectiveCamera).updateProjectionMatrix() // TODO move into camera
  }

  private animation(time: number) {
    this.world?.fixedStep()
    this.objects.forEach(o => o.update(time))
    this.renderer.render(this.scene, this.camera)
  }
}