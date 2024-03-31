import { Component } from "../lib/engine/Component";

export class DataComponent<T> extends Component {
  constructor(
    public readonly name: string,
    public readonly value: T
  ) { super() }
}