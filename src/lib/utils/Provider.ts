export class ProviderTag<T> {
  constructor(public readonly symbol: symbol){}
}

export class Provider<T> {

  private constructor(
    private value: T
  ) {}

  public static of<T>(tag: ProviderTag<T>) {
    return providers[tag.symbol].get() as T
  }

  public static provide<T>(tag: ProviderTag<T>, value: T) {
    providers[tag.symbol].value = value
  }

  public static register<T>(defaultValue: T): ProviderTag<T> {
    const tag = Symbol()
    providers[tag] = new Provider(defaultValue)
    return new ProviderTag(tag)
  }

  get() {
    return this.value!
  }
}

const providers: Record<symbol, Provider<any>> = {}