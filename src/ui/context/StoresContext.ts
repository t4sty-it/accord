import { createContext } from "react";
import { ObservableStore } from "../../lib/utils/ObservableStore";
import { Player } from "../../stores/PlayerStore";

export const StoresContext = createContext<{
  player: ObservableStore<Player>
}>({
  player: new ObservableStore<Player>({health: 0, name: ''})
})