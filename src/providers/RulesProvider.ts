import { Provider } from "../lib/utils/Provider";

export const RulesProvider = Provider.register({
  reportHit(dmg: number) {
    console.log('HIT', dmg)
  }
})