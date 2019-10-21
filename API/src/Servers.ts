// API/src/Servers.ts
import { createSocket, Socket, RemoteInfo } from 'dgram';
import WebSocket = require('ws');

interface ClientServer {
  port: string;
  id: string;
  udpServer?: Socket;
}

const clientServers: ClientServer[] = [{ port: '53', id: 'abc' }];

export async function createUDPServer(
  Id: string,
  webSocket: WebSocket,
): Promise<void> {
  const clientServer = clientServers.find(({ id }) => id === Id);
  if (!clientServer) throw new Error('INVALID CLIENT');

  let server: Socket;
  if (!clientServer.udpServer) {
    server = createSocket('udp4');
    clientServer.udpServer = server;
    server.bind(parseInt(clientServer.port));
  } else server = clientServer.udpServer;

  let info: RemoteInfo;

  server.on('message', (msg, clnt) => {
    if (webSocket.readyState !== 1) {
      console.log(webSocket.readyState);
      return;
    }

    webSocket.send(msg);
    info = clnt;
  });

  webSocket.on('message', (data: Buffer) => {
    console.log('Got Response', data.toString());
    server.send(data, info.port, info.address);
  });
}
