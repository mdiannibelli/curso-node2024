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
    // routes: AppRoutes.routes,
  });

  const httpServer = createServer(server.app) // same configuration of express server
  WebSocketService.initialize({
    server: httpServer,
    path: '/ws'
  })

  server.setRoutes(AppRoutes.routes); // set routes after WebsocketService was initialized

  // server.start();
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  })
}