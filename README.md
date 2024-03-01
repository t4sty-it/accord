# Accord

I hacked toghether threejs and cannon-es physics, giving it some structure a-la-Unity: you can create `GameObject`s and add `Component` for assets and behaviors. The main advantage vs going all free-style as I've usually seen with threejs is you get explicit dependencies and easy reusability.

There's a simple FPS game implemented to showcase the structure. Checkout

- `main.ts` for the FPS example
- `objects` folder for the definitions of the objects used in the example FPS
- `component` folder for classes that wrap threejs or cannon-es objects
- `behaviors` folder for classes that combine `components` into reusable  block of functionality
- `lib` folder for the base classes that define the whole structure


## Requirements and dependencies
The project depends on [bun](bun.sh), is written in Typescript and uses vitejs for packaging.

## Operation

To install:
```sh
bun install
```

To run in dev mode:
```sh
bun run dev
```

To build:
```sh
bun run build
```