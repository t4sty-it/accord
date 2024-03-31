import { ObservableStore } from "../lib/utils/ObservableStore";

export type Player = {
  name: string
  health: number
}

export class PlayerStore extends ObservableStore<Player> {

  constructor(player: Player) {
    super(player)
  }

  applyDamage(dmg: number) {
    this.state = {
      ...this.state,
      health: Math.max(0, this.state.health - dmg)
    }
    this.notifyListeners()
  }

  rename(name: string) {
    this.state = {...this.state, name}
    this.notifyListeners()
  }

  revive() {
    this.state = {...this.state, health: 100}
    this.notifyListeners()
  }
}