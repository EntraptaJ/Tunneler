// Server/src/index.ts
import { createSocket } from 'dgram';
import { createConnection } from 'net';

const SERVER_PORT = process.env.SERVER_PORT || '53';

async function startAPI(): Promise<void> {
  const server = createSocket('udp4');

  server.on('message', (msg, clnt) => {
    const client = createConnection({ host: 'clientudp', port: 5859 }, () => {
      client.write(msg);
    });

    client.on('data', data => {
      server.send(data, clnt.port, clnt.address);
    });
  });

  server.bind(parseInt(SERVER_PORT));

  console.log(`Server listening on UDP ${SERVER_PORT}`);
}

startAPI();
