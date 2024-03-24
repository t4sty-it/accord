type Native = string | number | boolean

export function* pipe<T extends Native>(buf: T[], init: T) {
  let lastYielded = init
  while(true) {
    if (buf.length > 0) {
      lastYielded = buf.shift()!
      yield lastYielded
    }
    else {
      yield lastYielded
    }
  }

  return lastYielded
}