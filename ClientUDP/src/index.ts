// ClientUDP/src/index.ts
import { createServer } from 'net';
import { createSocket } from 'dgram';

const CLIENT_PORT = process.env.CLIENT_PORT || '53';
const CLIENT_HOST = process.env.CLIENT_HOST || '8.8.8.8';

async function startClientUDP(): Promise<void> {
  const server = createServer(socket => {
    const client = createSocket('udp4');

    socket.on('data', function(chunk) {
      client.send(chunk, parseInt(CLIENT_PORT), CLIENT_HOST);
    });

    client.on('message', msg => {
      socket.write(msg);

      client.close();
    });

    // ;
  });

  console.log('Starting Client UDP');
  server.listen(5859);
  console.log('Server listening on port 5859');
}

startClientUDP();
