import { DataComponent } from "../components/DataComponent";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Component } from "../lib/engine/Component";
import { PlayerStore } from "../stores/PlayerStore";

export class DamageOnHit extends Component {

  name = 'damage-on-hit'

  constructor(
    rb: RigidBodyComponent,
    player: PlayerStore
  ) {
    super()

    rb.onCollision(collision => {
      if (!this.gameObject) return

      const dmgComponent = collision.gameObject
        .getComponent<DataComponent<number>>('data-dmg')
      if (!dmgComponent) return

      const distance = collision.gameObject.obj.position.distanceTo(
        this.gameObject!.obj.position
      )
      const blastRadius = 4
      const coef = Math.max(0, blastRadius - distance) / blastRadius
      const dmg = dmgComponent.value * coef
      player.applyDamage(dmg)
    })
  }
}