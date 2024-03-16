import { DataConnection, Peer } from 'peerjs'

const appPrefix = 'poidas'
const id = (...tokens: string[]) => [appPrefix, ...tokens].join('-')
const msg = (...tokens: string[]) => tokens.join(' ')

export type ConnectionEvent = 'mate:new' | 'mate:adieu' | 'mate:data'
export type MessageHandler = (user: string, message: string) => void

export class Connection {

  private peer?: Peer
  private _userName?: string
  public get userName() { return this._userName }

  private roomMates: Record<string, DataConnection> = {}
  private eventHandlers: Record<string, MessageHandler[]> = {}

  constructor() {}

  public init(userName: string) {
    this._userName = userName
    this.peer = new Peer(id(userName))
    this.peer.on('connection', conn => {
      conn.on('open', () => {
        console.log('connected from', conn.connectionId)
      })
      conn.on('data', data => this.respond(conn, data))
    })
  }

  public connect(otherUser: string) {
    this.ifReady(() => {
      console.log('connecting to', id(otherUser))
      const conn = this.peer!.connect(id(otherUser))
      conn.on('open', () => {
        console.log('connected to', conn.connectionId)
        this.addMate(otherUser, conn)
        conn.send(msg('HELO', this._userName!))
      })
      conn.on('data', data => this.respond(conn, data))
    })
  }

  public multicast(message: string) {
    this.ifReady(() => {
      Object.values(this.roomMates).forEach(conn => conn.send(msg('DATA', this._userName!, message)))
    })
  }

  public close() {
    this.ifReady(() => {
      Object.values(this.roomMates).forEach(conn => conn.send(msg('BYE', this._userName!)))
    })
  }

  private ifReady(cb: () => void) {
    if (this.peer != null && this._userName != null) {
      cb()
    }
  }

  private respond(conn: DataConnection, data: unknown) {
    if (typeof data !== 'string') {
      console.warn('received unusable data', data)
      return
    }

    const [cmd, ...args] = data.split(/\s+/)
    switch(cmd) {
      case 'HELO': {
        console.log('received HELO', args)
        conn.send(msg('ROOM', ...Object.keys(this.roomMates)))
        this.addMate(args[0], conn)
      }
      break
      
      case 'ROOM': {
        const mates = args
        const mate = mates.find(m => !Object.keys(this.roomMates).includes(m))
        console.log('received ROOM', args, 'mate', mate)
        if (mate) this.connect(mate)
      }
      break

      case 'BYE': {
        const mate = args[0]
        this.removeMate(mate)
      }
      break

      case 'DATA': {
        const [mate, ...message] = args
        this.trigger('mate:data', mate, message.join(' '))
      }
    }
  }

  public on(event: ConnectionEvent, handler: MessageHandler) {
    if (this.eventHandlers[event] == null) this.eventHandlers[event] = []
    this.eventHandlers[event].push(handler)
  }

  public off(event: ConnectionEvent, handler: MessageHandler) {
    this.eventHandlers[event] = this.eventHandlers[event].filter(h => h !== handler)
  }

  private trigger(event: ConnectionEvent, user: string, message: string) {
    (this.eventHandlers[event] ?? []).forEach(h => h(user, message))
  }

  private addMate(name: string, conn: DataConnection) {
    console.log('add mate', name)
    this.roomMates[name] = conn
    this.trigger('mate:new', name, 'HELO')
  }

  private removeMate(name: string) {
    delete this.roomMates[name]
    this.trigger('mate:adieu', name, 'ADIEU')
  }
}