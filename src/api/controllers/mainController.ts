import { ConnectedSocket, OnConnect, OnDisconnect, SocketController, SocketIO,  } from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class MainController {

  @OnDisconnect()
  public onDisconnection(
    @ConnectedSocket() socket: Socket, 
    @SocketIO() io: Server
  ){
    console.log('A User Disconnected: ', socket.id)
  }
  
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket, 
    @SocketIO() io: Server
  ){
    console.log('New User connected: ', socket.id)
  }
}