type Callback = (...args: any[]) => void

export class EventSystem {

  private callbacks: Record<string, Callback[]> = {}

  public on(event: string, cb: Callback) {
    if (!Object.hasOwn(this.callbacks, event))
      this.callbacks[event] = []

    this.callbacks[event].push(cb)
  }

  public off(event: string, cb: Callback) {
    if (Object.hasOwn(this.callbacks, event)) {
      this.callbacks[event] = this.callbacks[event].filter(x => x != cb)
    }
  }

  public trigger(event: string, ...args: any[]) {
    (this.callbacks[event] ?? []).forEach(cb => cb(...args))
  }
}