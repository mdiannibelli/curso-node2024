import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WebSocketService } from './presentation/services/wss.service';


(async () => {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app) // same configuration of express server
  WebSocketService.createWebSocketService({
    server: httpServer,
    path: '/ws'
  })

  // server.start();
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  })
}