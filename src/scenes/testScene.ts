import { Object3D, PerspectiveCamera } from "three";
import { Atlas } from "../lib/engine/Atlas";
import { GameScene } from "../lib/engine/GameScene";
import { light } from "../objects/light";
import { ground } from "../objects/ground";
import { GameObject } from "../lib/engine/Gameobject";
import { Vec3, World } from "cannon-es";
import { cameraMan } from "../objects/cameraMan";
import { PlayerStore } from "../stores/PlayerStore";

export function testScene(atlas: Atlas, stores: {player: PlayerStore}) {
  const scene = new GameScene({
    world: new World({ gravity: new Vec3(0, -9.82, 0) }),
    mountOn: document.body
  })

  const camera = new PerspectiveCamera(70)
  scene.setCamera(camera)
  scene.addObject(light)
  scene.addObject(ground)
  
  const swordModel = atlas.get('sword') as Object3D
  swordModel.scale.set(.1, .1, .1)
  const sword = new GameObject('sword', swordModel)
  scene.addObject(sword)

  sword.obj.position.setY(1)

  const user = cameraMan(camera, stores.player);
  scene.addObject(user)
}