import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server"

(async () => {
    main()
})()

async function main() {
    await MongoDatabase.connectDB({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    Server.start();
}