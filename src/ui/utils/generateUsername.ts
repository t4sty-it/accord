export function generateUsername() {
  const adj = [
    'frantic', 'happy', 'sad', 'cheap', 'coward', 'great', 'jolly',
    'frowny', 'classic', 'plain', 'zippy', 'rusty', 'mythical',
    'sloppy', 'dusty', 'awkward', 'sparkling'
  ]
  const col = [
    'red', 'blue', 'green', 'silver', 'gold', 'black', 'white',
    'orange', 'yellow', 'purple', 'magenta', 'cyan'
  ]
  const anm = [
    'zebra', 'lion', 'monkey', 'possum', 'whale', 'shark',
    'hyena', 'crocodile', 'elephant', 'crow', 'vulture', 
  ]
  const choose = <T>(items: T[]) => items[Math.ceil(Math.random() * (items.length - 1))]
  const name = [choose(adj), choose(col), choose(anm)].join('_')

  return name
}