import { useSocketServer } from "socket-controllers";
import { Server, Socket } from "socket.io";

export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  })

  useSocketServer(io, { controllers: [__dirname + '/api/controllers/*.ts'] })  

  return io
}