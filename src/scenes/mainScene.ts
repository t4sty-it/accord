import * as THREE from 'three';
import { GameScene } from "@engine";
import { Vec3, World } from 'cannon-es';
import { cameraMan } from '../objects/cameraMan';
import { ground } from '../objects/ground';
import { Connection } from '../lib/multiplayer/connection';
import { Mate } from '../objects/mate';
import { connectObject } from '../objects/configurators/connectObject';
import { MessageType, decodeTransform, getMessageType } from '../lib/multiplayer/codec';
import { Bullet } from '../objects/bullet';
import { light } from '../objects/light';
import { Spawner } from '../objects/spawner';
import { Atlas } from '../lib/engine/Atlas';
import { PlayerStore } from '../stores/PlayerStore';

export function mainScene(atlas: Atlas, stores: {player: PlayerStore}, connection: Connection, dbgData: string[]) {
  const scene = new GameScene({
    world: new World({ gravity: new Vec3(0, -9.82, 0) }),
    mountOn: document.body
  });

  const camera = new THREE.PerspectiveCamera(70);
  scene.setCamera(camera);

  scene.addObject(light);
  scene.addObject(ground);

  connection.on('mate:new', (user, msg) => {
    console.log('new mate:', user);
    const mate = connectObject('remoteOwner', Mate(user), connection, user);
    scene.addObject(mate);
  });

  connection.on('mate:adieu', (user, msg) => {
    scene.removeObject(
      scene.objectsWhere(obj => obj.name == user)[0]
    );
  });

  const log: Record<string, boolean | string> = {
    [MessageType.Spawn]: true,
    [MessageType.Transform]: false, // 'bullet',
    [MessageType.Destroy]: true,
  }; (window as any).log = log;

  connection.on('mate:data', (user, msg) => {
    const msgType = getMessageType(msg);
    const l = log[msgType];

    if ((typeof l === 'boolean' && l) ||
      (typeof l === 'string' && l.match(msg))) console.log('DATA', user, msg);

    if (msgType === MessageType.Transform) {
      const [name, pos, ..._] = decodeTransform(msg);
      dbgData.push([name, v(pos)].join(' '));
    }
  });

  const v = (v: THREE.Vector3Like) => ['x', 'y', 'z'].map(k => f(v[k as keyof typeof v])).join(' ');
  const f = (n: number) => n.toFixed(3);

  const factory = (name: string) => {
    const bulletMatch = name.match(/bullet-(\d+)/);
    console.log('bulletmatch', bulletMatch);
    if (bulletMatch) return Bullet(bulletMatch[1]);

    return null;
  };

  scene.addObject(Spawner(connection, factory));

  const user = cameraMan(camera, stores.player, connection);
  scene.addObject(connectObject('localOwner', user, connection, () => connection.userName!));
}
