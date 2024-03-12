import { Component } from "../lib/engine/Component";
import { GameObject } from "../lib/engine/Gameobject";
import { MessageType, decodeSpawn, getMessageType } from "../lib/multiplayer/codec";
import { Connection } from "../lib/multiplayer/connection";
import { connectObject } from "../objects/configurators/connectObject";

export class SpawnReceiver extends Component {
  
  constructor(
    connection: Connection,
    factory: (name: string) => GameObject | null
  ) { 
    super()
  
    connection.on('mate:data', (user, msg) => {
      const msgType = getMessageType(msg)

      if (msgType == MessageType.Spawn) {
        const [name, pos, rot, scl] = decodeSpawn(msg)
        const gObj = factory(name)
        
        if (gObj != null) {
          const cObj = connectObject('remoteOwner', gObj, connection)
          cObj.obj.position.copy(pos)
          cObj.obj.quaternion.copy(rot)
          cObj.obj.scale.copy(scl)
          this.gameObject?.gameScene?.addObject(cObj)
        }
      }
    })
  }
}