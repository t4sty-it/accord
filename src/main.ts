import * as THREE from 'three'
import { GameScene } from "@engine";
import { Vec3, World } from 'cannon-es';
import { cameraMan } from './objects/cameraMan';
import { ground } from './objects/ground';
import { Connection } from './lib/multiplayer/connection';
import { Mate } from './objects/mate';
import { connectObject } from './objects/configurators/connectObject';
import { MessageType, decodeTransform, getMessageType } from './lib/multiplayer/codec';
import { Bullet } from './objects/bullet';
import { light } from './objects/light';
import { Spawner } from './objects/spawner';
import { renderUI } from './ui';

const scene = new GameScene({
  world: new World({gravity: new Vec3(0, -9.82, 0)}),
  mountOn: document.body
})

const camera = new THREE.PerspectiveCamera(70)
scene.setCamera(camera)

scene.addObject(light)
scene.addObject(ground)

const conn = new Connection()

conn.on('mate:new', (user, msg) => {
  console.log('new mate:', user)
  const mate = connectObject('remoteOwner', Mate(user), conn, user)
  scene.addObject(mate)
})

conn.on('mate:adieu', (user, msg) => {
  scene.removeObject(
    scene.objectsWhere(obj => obj.name == user)[0]
  )
})

const log: Record<string, boolean | string> = {
  [MessageType.Spawn]: true,
  [MessageType.Transform]: 'bullet',
  [MessageType.Destroy]: true,
}
;(window as any).log = log

conn.on('mate:data', (user, msg) => {
  const msgType = getMessageType(msg)
  const l = log[msgType]

  if ((typeof l === 'boolean' && l) ||
      (typeof l === 'string' && l.match(msg))
  ) console.log('DATA', user, msg)

  if (msgType === MessageType.Transform) {
    const [name, pos, ..._] = decodeTransform(msg)
    dbgData.push([name, v(pos)].join(' '))
  }
})

const v = (v: THREE.Vector3Like) => ['x', 'y', 'z'].map(k => f(v[k as keyof typeof v])).join(' ')
const f = (n: number) => n.toFixed(3)

const factory = (name: string) => {
  const bulletMatch = name.match(/bullet-(\d+)/)
  console.log('bulletmatch', bulletMatch)
  if (bulletMatch) return Bullet(bulletMatch[1])

  return null
}

scene.addObject(Spawner(conn, factory))

const user = cameraMan(camera, conn)
scene.addObject(connectObject('localOwner', user, conn, () => conn.userName! ))

let dbgData: string[] = []
const pipe = (function* (buf: string[]) {
  let lastYielded = ''
  while(true) {
    if (buf.length > 0) {
      lastYielded = buf.shift()!
      yield lastYielded
    }
    else {
      yield lastYielded
    }
  }
})(dbgData)

renderUI({
  multiplayer: {
    logIn: (username: string) => { conn.init(username) },
    connect: (remoteUser: string) => { conn.connect(remoteUser) }
  },
  debug: {
    getData: () => pipe.next().value
  }
})
