import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Server, Socket } from "socket.io";

import { rolledDices } from "../../contexts/roomContext";

@SocketController()
export class RoomController {

  @OnMessage("join_game_request")
  public async joinGame(
    @SocketIO() io: Server, 
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ){
    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId)
    const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id)
    
    socket.on("disconnect", () => {
      console.log("User", socket.id, "disconnect at room: ", message.roomId)
      socket.leave(message.roomId)
    })
    
    if(socketRooms.length > 0 || connectedSockets && connectedSockets.size === 15){
      socket.emit("room_join_error")
    } else {
      console.log('User', socket.id, 'joning room:', message.roomId)
      
      socket.emit("room_able_to_join")
      await socket.join(message.roomId)
      
    }
  }
}