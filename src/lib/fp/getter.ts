export type Native = string | number | boolean | object
export type Getter<T extends Native> = T | (() => T)

export function value<T extends Native>(g: Getter<T>) {
  return typeof g == 'function'
    ? g()
    : g
}