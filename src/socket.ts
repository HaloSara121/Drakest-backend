import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";

export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  })

  // if(process.env.NODE_ENV === "production") {
  //   useSocketServer(io, { controllers: [__dirname + '/api/controllers/*.js'] })  
  // }

  // if(process.env.NODE_ENV === "development") {
    useSocketServer(io, { controllers: [__dirname + '/api/controllers/*.ts'] })  
  // } 

  return io
}