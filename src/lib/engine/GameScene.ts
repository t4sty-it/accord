import { World } from 'cannon-es';
import * as THREE from 'three';
import { GameObject } from './Gameobject';
import { RenderStack } from './RenderStack';
import { Pass } from 'three/examples/jsm/Addons.js';

export class GameScene {
  private _camera: THREE.Camera | null = null
  public get camera() { return this._camera }
  public readonly scene = new THREE.Scene()
  public readonly world

  private objects: GameObject[] = []
  private renderer: THREE.WebGLRenderer
  // private renderStack: any[] = []
  private renderStack: RenderStack

  constructor({camera, world, mountOn }: {
    camera?: THREE.Camera,
    world?: World,
    mountOn: HTMLElement,
  }
  ){
    this._camera = camera ?? null
    this.world = world ?? new World()

    const width = mountOn.clientWidth, height = mountOn.clientHeight;
    this.renderer = this.setupRenderer(width, height)
    mountOn.appendChild(this.renderer.domElement)

    this.renderStack = new RenderStack(this.renderer, this.scene)

    window.addEventListener('resize', this.resize.bind(this))

  }

  private setupRenderer(width: number, height: number) {
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
    renderer.setSize( width, height );
    renderer.setAnimationLoop(this.animation.bind(this));
    renderer.setClearColor(0x334455)
    return renderer
  }

  addObject(obj: GameObject) {
    this.objects.push(obj)
    this.eachObject(o => {
      o.onAdd(this)
      o.start()
    }, [obj])
  }

  removeObject(obj: GameObject) {
    this.objects = this.objects.filter(o => o != obj)
    obj.onRemove()
  }

  objectsWhere(filter: (obj: GameObject) => boolean): GameObject[] {
    return this.objects.filter(filter).slice(0)
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
    this.eachObject(o => o.update(time), this.objects)
    // if (this._camera != null)
    //   this.renderer.render(this.scene, this._camera)
    this.renderStack.render()
  }

  private eachObject(cb: (obj: GameObject) => void, init: GameObject[]) {
    const objs: GameObject[] = []

    init.forEach(o => {
      cb(o)
      objs.push(...o.children)
    })

    while (objs.length > 0) {
      const obj = objs.pop()!
      cb(obj)
      objs.push(...obj.children)
    }
  }

  public setCamera(camera: THREE.Camera) {
    this._camera = camera
    this.renderStack.setCamera(camera)
    this.resize()
  }

  public setPostProcess(passes: Pass[]) {
    this.renderStack.update(passes)
  }

  public pushPostProcess(passes: Pass[]) {
    this.renderStack.push(passes)
  }

  public popPostProcess(passes: Pass[]) {
    this.renderStack.pop(passes)
  }
}