import { Connection } from './lib/multiplayer/connection';
import { Route, renderUI } from './ui';
import { mainScene } from './scenes/mainScene';
// import { testScene } from './scenes/testScene';
import { pipe } from './lib/utils/pipe';
import { DefaultLoadingManager } from 'three';
import { Atlas } from './lib/engine/Atlas';

import clockModel from './assets/clock.fbx?url'
import swordModel from './assets/models/sword.glb?url'
import { PlayerStore } from './stores/PlayerStore';
import { Provider } from './lib/utils/Provider';
import { RulesProvider } from './providers/RulesProvider';

const connection = new Connection();
let dbgData: string[] = [];
const dbgDataPipe = pipe(dbgData, '');

const route: Route[] = []
const routePipe = pipe(route, 'loading')
const assetsLoaded: number[] = []
const assetsLoadedPipe = pipe(assetsLoaded, 0)

DefaultLoadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
  assetsLoaded.push(itemsLoaded/itemsTotal)
}

DefaultLoadingManager.onLoad = () => {
  route.push('connect')
  mainScene(atlas, stores, connection, dbgData);
  // testScene(atlas)
}

const atlas = new Atlas()
atlas.register('clock', clockModel)
atlas.register('sword', swordModel)
atlas.loadAssets()

const stores = {
  player: new PlayerStore({name: 'test', health: 100})
}

Provider.provide(RulesProvider, {
  reportHit(dmg) {
    console.log('HIT', dmg)
    stores.player.applyDamage(dmg)
    if (stores.player.getSnapshot().health <= 0)
      console.log('DEAD')
  }
})

renderUI({
  route: () => routePipe.next().value,
  assetsLoaded: () => assetsLoadedPipe.next().value,
  multiplayer: {
    logIn: (username: string) => { connection.init(username) },
    connect: (remoteUser: string) => { connection.connect(remoteUser) }
  },
  debug: {
    getData: () => dbgDataPipe.next().value
  },
  playerStore: stores.player
})