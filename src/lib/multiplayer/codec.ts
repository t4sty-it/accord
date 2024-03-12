import { QuaternionLike, Vector3Like } from "three"

export const encodeTransform: (objectName: string, pos: Vector3Like, rot: QuaternionLike, scale: Vector3Like) => string
= (name, pos, rot, scl) => [
  't',
  name,
  ..._encodeV3(pos),
  ..._encodeQ(rot),
  ..._encodeV3(scl),
].join(' ')

export const decodeTransform: (msg: string) => [string, Vector3Like, QuaternionLike, Vector3Like]
= msg => {
  const [name, ...params] = _decode(msg)
  const [px , py, pz, rx, ry, rz, rw, sx, sy, sz] = params.map(parseFloat)
  
  return [
    name,
    _decodeV3([px, py, pz]),
    _decodeQ([rx, ry, rz, rw]),
    _decodeV3([sx, sy, sz]),
  ]
}

export const encodeSpawn: (objectName: string, pos: Vector3Like, rot: QuaternionLike, scale: Vector3Like) => string
= (name, pos, rot, scl) => _encode([
  's',
  name,
  ..._encodeV3(pos),
  ..._encodeQ(rot),
  ..._encodeV3(scl)
])

export const decodeSpawn: (msg: string) => [string, Vector3Like, QuaternionLike, Vector3Like]
= msg => {
  const [name, ...params] = _decode(msg)
  const [px, py, pz, qx, qy, qz, qw, sx, sy, sz] = params.map(parseFloat)

  return [
    name,
    _decodeV3([px, py, pz]),
    _decodeQ([qx, qy, qz, qw]),
    _decodeV3([sx, sy, sz])
  ]
}

export const encodeDestroy: (objectName: string, pos: Vector3Like, rot: QuaternionLike, scale: Vector3Like) => string
= (name, pos, rot, scl) => _encode([
  MessageType.Destroy,
  name,
  ..._encodeTransform(pos, rot, scl)
])

export const decodeDestroy: (msg: string) => [string, Vector3Like, QuaternionLike, Vector3Like]
= msg => {
  const [name, ...params] = _decode(msg)
  return [
    name,
    ..._decodeTransform(params)
  ]
}

const _encodeTransform = (pos: Vector3Like, rot: QuaternionLike, scl: Vector3Like) => [
  ..._encodeV3(pos),
  ..._encodeQ(rot),
  ..._encodeV3(scl)
]

const _decodeTransform = (params: string[]) => {
  const [px, py, pz, qx, qy, qz, qw, sx, sy, sz] = params.map(parseFloat)
  return [
    _decodeV3([px, py, pz]),
    _decodeQ([qx, qy, qz, qw]),
    _decodeV3([sx, sy, sz])
  ] as const
}

// const _decodeTransform = (msg: string) =>

const _encodeV3 = (v: Vector3Like) => [v.x, v.y, v.z]
const _decodeV3 = ([x, y, z]: [number, number, number]) => ({x, y, z})
const _encodeQ = (q: QuaternionLike) => [q.x, q.y, q.z, q.w]
const _decodeQ = ([x, y, z, w]: [number, number, number, number]) => ({x, y, z, w})

const _encode = (a: any[]) => a.join(' ')
const _decode = (msg: string) => 
  msg.split(' ')
    .slice(1)

export const MessageType = {
  Transform: 't',
  Spawn: 's',
  Destroy: 'd',
} as const

export const getMessageType = (msg: string) => msg.split(' ')[0]