import { envs } from "../src/config/envs";
import { AppsRoutes } from "../src/presentation/routes";
import { Server } from "../src/presentation/server";

export const testServer = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppsRoutes.routes
});