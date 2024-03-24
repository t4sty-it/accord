import { Connection } from './lib/multiplayer/connection';
import { Route, renderUI } from './ui';
import { mainScene } from './scenes/mainScene';
// import { testScene } from './scenes/testScene';
import { pipe } from './lib/utils/pipe';
import { DefaultLoadingManager } from 'three';
import { Atlas } from './lib/engine/Atlas';

import clockModel from './assets/clock.fbx?url'
import swordModel from './assets/models/sword.glb?url'

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
  mainScene(atlas, connection, dbgData);
  // testScene(atlas)
}

const atlas = new Atlas()
atlas.register('clock', clockModel)
atlas.register('sword', swordModel)
atlas.loadAssets()

renderUI({
  route: () => routePipe.next().value,
  assetsLoaded: () => assetsLoadedPipe.next().value,
  multiplayer: {
    logIn: (username: string) => { connection.init(username) },
    connect: (remoteUser: string) => { connection.connect(remoteUser) }
  },
  debug: {
    getData: () => dbgDataPipe.next().value
  }
})
