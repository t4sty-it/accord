import { Component } from "@engine";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Vec3 } from "cannon-es";

export class PointerLockController extends Component {

  private domElement: HTMLCanvasElement

  constructor(
    public readonly rb: RigidBodyComponent,
    public readonly camera: THREE.Camera,
    public readonly options: {
      torqueFactor: number,
    }
  ) {
    super()

    this.domElement = window.document.querySelector('canvas')!
    this.domElement.addEventListener('click', async () => {
      this.domElement.requestPointerLock()
    })

    const rotateCamera = this.rotateCamera.bind(this)

    window.document.addEventListener('pointerlockchange', () => {
      const locked = window.document.pointerLockElement === this.domElement
      if (locked) {
        window.addEventListener('mousemove', rotateCamera)
      }
      else {
        window.removeEventListener('mousemove', rotateCamera)
      }
    })
  }

  private rotateCamera(e: MouseEvent) {
    this.rb.body.applyTorque(
      Vec3.UNIT_Y.scale(
        -e.movementX * this.options.torqueFactor
      )
    )

    const ySensitivity = 0.01
    const deltaPitch = e.movementY * ySensitivity
    const targetPitch = this.camera.rotation.x - deltaPitch

    if (targetPitch >= -Math.PI/2 && targetPitch <= Math.PI/2)
      this.camera.rotateX(-deltaPitch)

  }
}