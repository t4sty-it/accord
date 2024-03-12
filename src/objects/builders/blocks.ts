import { GameScene } from "../../lib/engine/GameScene";
import { Block } from "../block";

export function buildBlocks(scene: GameScene) {
  for (let i = 0; i < 15; i++) {
    const block = Block('block-' + i,
      {
        x: (Math.random() * i * 5) - (i * 5 / 2),
        y: 2,
        z: (Math.random() * i * 5) - (i * 5 / 2)
      }
    )
    scene.addObject(block)
  }
}