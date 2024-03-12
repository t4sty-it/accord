import * as THREE from 'three'
import { GameObject, GameScene } from "@engine";
import { Vec3, World } from 'cannon-es';
import { cameraMan } from './objects/cameraMan';
import { ground } from './objects/ground';
import { Connection } from './lib/multiplayer/connection';
import { Mate } from './objects/mate';
import { connectObject } from './objects/configurators/connectObject';
import { MessageType, getMessageType } from './lib/multiplayer/codec';
import { Bullet } from './objects/bullet';
import { light } from './objects/light';
import { Spawner } from './objects/spawner';

const scene = new GameScene({
  world: new World({gravity: new Vec3(0, -9.82, 0)}),
  mountOn: document.body
})

const camera = new THREE.PerspectiveCamera(70)
scene.setCamera(camera)

scene.addObject(light)
scene.addObject(ground)

const adj = ['frantic', 'happy', 'sad', 'cheap', 'coward', 'great']
const col = ['red', 'blue', 'green', 'silver', 'gold', 'black', 'white']
const anm = ['zebra', 'lion', 'diode', 'monkey', 'possum', 'whale', 'shark']
const choose = <T>(items: T[]) => items[Math.ceil(Math.random() * (items.length - 1))]
const name = [choose(adj), choose(col), choose(anm)].join('_')
const conn = new Connection(name)

conn.on('mate:new', (user, msg) => {
  console.log('new mate:', user)
  const mate = connectObject('remoteOwner', Mate(user), conn, user)
  otherUser = mate
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
})

const factory = (name: string) => {
  const bulletMatch = name.match(/bullet-(\d+)/)
  console.log('bulletmatch', bulletMatch)
  if (bulletMatch) return Bullet(bulletMatch[1])

  return null
}

scene.addObject(Spawner(conn, factory))

let otherUser: GameObject
const user = cameraMan(camera, conn)
scene.addObject(connectObject('localOwner', user, conn, conn.userName))

const $app = document.querySelector('#app')!
const $dbg = document.createElement('div')
$dbg.className = 'dbg'
$app.append($dbg)

const $name = document.createElement('div')
$name.textContent = name
$name.className = 'username'
$dbg.append($name)

const $userPos = document.createElement('div')
$userPos.className = 'userpos'
$dbg.append($userPos)

const $otherUserPos = document.createElement('div')
$otherUserPos.className = 'otherUserPos'
$dbg.append($otherUserPos)

const f = (n: number) => n.toFixed(3)
const v = (v: THREE.Vector3Like) => ['x', 'y', 'z'].map(k => f(v[k as keyof typeof v])).join(' ')
setInterval(() => {
  $userPos.textContent = v(user.obj.position)
  otherUser && ($otherUserPos.textContent = v(otherUser.obj.position))
}, 100)

const $form = document.createElement('form')
$form.addEventListener('submit', e => {
  e.preventDefault()
  e.stopPropagation()

  const remotePlayerName = ((e.target as HTMLFormElement).elements.namedItem('target') as HTMLInputElement).value
  conn.connect(remotePlayerName)
})
$dbg.append($form)

const $input = document.createElement('input')
$input.placeholder = 'remote user name'
$input.name = 'target'

$form.append($input)

;(window as any).remote = conn
