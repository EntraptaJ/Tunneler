// Server/src/index.ts
import express from 'express';
import expressWs from 'express-ws';
import { createUDPServer } from './Servers';
/*import { createSocket } from 'dgram';
import { createConnection } from 'net'; */

// const SERVER_PORT = process.env.SERVER_PORT || '53';

const app = express();

async function startAPI(): Promise<void> {
  const ws = expressWs(app);

  ws.app.ws('/test/:id', async (a, b) => {
    console.log('Web Socket Open');
    await createUDPServer(b.params.id, a);
  });

  await app.listen(80);
  console.log('API server listening on port 80');

  /* const server = createSocket('udp4');

  server.on('message', (msg, clnt) => {
    const client = createConnection({ host: 'clientudp', port: 5859 }, () => {
      client.write(msg);
    });

    client.on('data', data => {
      server.send(data, clnt.port, clnt.address);
    });
  });

  server.bind(pa
  console.log(`Server listening on UDP ${SERVER_PORT}`); */
}

startAPI();
