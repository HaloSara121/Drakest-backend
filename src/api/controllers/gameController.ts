import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";

// import { rolledDices } from "../../contexts/roomContext";

// console.log(rolledDices)

const rolledDices: any[] = []

@SocketController()
export class GameController {

  private getSocketGameRoom(socket: Socket) {
    const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id)
    const gameRoom = socketRooms ?? socketRooms[0]

    return gameRoom
  }

  private rollDicesMethod(dicesAmount: number, dicesSizes: number, amplifier=0){
    const dicesValues = []

    for(let i = 0; i < dicesAmount; i++){
      dicesValues.push(Math.floor((Math.random() * dicesSizes) + 1) + amplifier)
    }

    return dicesValues
  }

  @OnMessage("roll_dices")
  public async rollDices(
    @SocketIO() io: Server, 
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ){
    const gameRoom = this.getSocketGameRoom(socket)
    const { roomId, user, diceInfo } = message

    const dicesValues: number[] = this.rollDicesMethod(diceInfo.diceAmount, diceInfo.diceSize, diceInfo.amplifier)

    const rollInfos = {
      roomId: roomId,
      user: user,
      diceInfo: diceInfo,
      dicesValues,
      currentSocket: socket.id
    }

    console.log(rollInfos)
    // rolledDices.push(rollInfos)

    // console.log(rolledDices.filter(obj => obj.roomId !== message.roomId))

    io.to(gameRoom).emit("rolled_dices_values", { rollInfos })
  }
}