import { EventSystem } from "./EventSystem";

export class ObservableStore<State> {

  private events = new EventSystem()

  constructor(protected state: State) {}

  public subscribe(listener: () => void) {
    this.events.on('change', listener)

    return () => {
      this.events.off('change', listener)
    }
  }

  public getState() {
    return this.state
  }
  
  protected notifyListeners() {
    this.events.trigger('change')
  }
}