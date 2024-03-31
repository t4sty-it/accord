import { Vector3 } from "three";
import { Component } from "../lib/engine/Component";
import { RigidBodyComponent } from "../components/RigidBodyComponent";
import { Provider } from "../lib/utils/Provider";
import { RulesProvider } from "../providers/RulesProvider";

type Props = {
  respawnLocation: Vector3,
}

export class RespawnWhenDead extends Component {

  constructor(private props: Props) { super() }

  private respawning = false

  private get rules() { return Provider.of(RulesProvider) }

  update(_time: number): void {
    if (this.rules.isDead() && !this.respawning) {
      this.respawning = true
      setTimeout(() => {
        this.rules.revive()
        this.respawn()
        this.respawning = false
      }, 2000)
    }
  }

  private respawn() {
    const respawnLocation = this.props.respawnLocation;

    this.gameObject!.obj.position.copy(respawnLocation);
    const rb = this.gameObject!
      .getComponent<RigidBodyComponent>('rigidBody');
    rb.body.position.set(
      respawnLocation.x,
      respawnLocation.y,
      respawnLocation.z
    );
  }
}