import { envs } from './config/envs';
import { MongoDatabase } from './data/mongo/mongo-database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async () => {
  main();
})();


async function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();

  await MongoDatabase.connect({
    mongoDbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })
}