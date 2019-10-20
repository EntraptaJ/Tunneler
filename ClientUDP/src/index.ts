// ClientUDP/src/index.ts
import { createSocket } from 'dgram';
import WebSocket from 'ws';

const CLIENT_PORT = process.env.CLIENT_PORT || '53';
const CLIENT_HOST = process.env.CLIENT_HOST || '8.8.8.8';

async function startClientUDP(): Promise<void> {
  const wsClient = new WebSocket('ws://api/test/abc');

  wsClient.on('open', () => {
    console.log('WS Open');

    wsClient.on('message', (data: Buffer) => {
      const client = createSocket('udp4');
      console.log('Got WS Message');

      client.on('message', msg => {
        console.log('Got Client Message', msg);
        wsClient.send(msg);

        client.close();
      });

      console.log(data);
      client.send(data, parseInt(CLIENT_PORT), CLIENT_HOST);
    });
  });

  console.log('Starting Client UDP');
}

startClientUDP();
