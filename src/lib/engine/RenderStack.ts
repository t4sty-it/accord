import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer, OutputPass, Pass, RenderPass } from "three/examples/jsm/Addons.js";

export class RenderStack {

  private passes: Pass[] = []

  private camera: Camera | null = null

  private _renderPass: RenderPass | null = null
  private get renderPass() {
    if (this.camera == null || this.scene == null)
      return null
  
    if (this._renderPass == null)
      this._renderPass = new RenderPass(this.scene, this.camera)

    return this._renderPass
  }

  private outputPass: OutputPass = new OutputPass()
  private _composer: EffectComposer | null = null
  private get composer(): EffectComposer | null {
    if (!this._composer && this.renderPass) {
      this._composer = this.rebuildStack(this.passes)
    }

    return this._composer
  }

  constructor(
    private renderer: WebGLRenderer,
    private scene: Scene
  ) {}
  
  public setCamera(camera: Camera) {
    this.camera = camera
  }

  public render() {
    const composer = this.composer 
    if (composer) {
      composer.render()
    }
  }

  public update(stack: Pass[]) {
    
    if (this._composer) {
      this._composer.dispose()
      this._composer = this.rebuildStack(stack)
    }

    this.passes = stack
  }

  public push(stack: Pass[]) {
    this.update([...this.passes, ...stack])
  }

  public pop(stack: Pass[]) {
    const passes = this.passes.filter(p => !stack.includes(p)) 
    this.update(passes)
  }

  private rebuildStack(stack: Pass[]) {
    const composer = new EffectComposer(this.renderer)
    if (this.renderPass) {
      ;[this.renderPass, ...stack, this.outputPass]
        .forEach(pass => composer.addPass(pass))
    }
    return composer
  }
}