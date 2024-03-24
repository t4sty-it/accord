import { createContext, useContext } from "react";

export const AssetLoadingContext = createContext<{
  loaded: () => number
}>({
  loaded: () => 0
})