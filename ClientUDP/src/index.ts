// ClientUDP/src/index.ts
import { createSocket } from 'dgram';
import WebSocket from 'ws';

const CLIENT_PORT = process.env.CLIENT_PORT || '53';
const CLIENT_HOST = process.env.CLIENT_HOST || 'rns1';

async function startClientUDP(): Promise<void> {
  const wsClient = new WebSocket('ws://api/test/abc');

  wsClient.on('open', () => {
    console.log('WS open');
    wsClient.on('message', (data: Buffer) => {
      const client = createSocket('udp4');

      client.on('message', msg => {
        wsClient.send(msg);

        client.close();
      });
      client.send(data, parseInt(CLIENT_PORT), CLIENT_HOST);
    });
  });

  console.log('Started Client UDP');
}

startClientUDP();
