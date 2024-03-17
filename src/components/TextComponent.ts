import { BufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { Component } from "../lib/engine/Component";
import { TextContainer, text2texture } from "../lib/text/text2texture";
import { Transform, apply } from "../lib/types/Transform";

export class TextComponent extends Component {

  constructor(
    content: string,
    container: TextContainer,
    geometry: BufferGeometry,
    transform: Transform
  ) {
    super()

    const txt = text2texture(content, container)
    const mesh = new Mesh(
      geometry,
      new MeshBasicMaterial({map: txt})
    )
    apply(transform, mesh)

    this.gameObject?.obj.add(mesh)
  }

}