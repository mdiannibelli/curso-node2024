import { yarg } from "./config/plugins/yargs-plugin";
import { ServerApp } from "./presentations/server-app";

console.log(yarg);

(async() => {
    await main()
})();

async function main() {
    const { b, l, s, n, d } = yarg;
    ServerApp.run({base: b, limit: l, showTable: s, name: n, destination: d});
}