import { GlitchPass, Pass, ShaderPass, SobelOperatorShader } from "three/examples/jsm/Addons.js";
import { Component } from "../lib/engine/Component";
import { Provider } from "../lib/utils/Provider";
import { RulesProvider } from "../providers/RulesProvider";

export class FxWhileDead extends Component {

  private wasDeadBefore = false

  private passes: Pass[]

  constructor() {
    super()

    const effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;

    const glitch = new GlitchPass()

    this.passes = [
      glitch,
      effectSobel
    ]
  }

  public update(_time: number): void {
    const isDead = Provider.of(RulesProvider).isDead()

    if (isDead != this.wasDeadBefore) {
      if (isDead) this.apply()
      else this.remove()
    }

    this.wasDeadBefore = isDead
  }

  private apply() {
    if (this.gameObject && this.gameObject.gameScene) {
      this.gameObject.gameScene.pushPostProcess(this.passes)
    }
  }

  private remove() {
    if (this.gameObject && this.gameObject.gameScene) {
      this.gameObject.gameScene.popPostProcess(this.passes)
    }
  }
}