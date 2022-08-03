import "dotenv/config";
import EmeraldClient from "./EmeraldClient";
import { Logger } from "./utils";

process.on("unhandledRejection", (err) => Logger.error((err as Error).stack ?? err));
process.on("uncaughtException", (err) => Logger.error(err.stack));

const client = new EmeraldClient(process.env.TOKEN!, {
  intents: 46791,
});
client.start();

export { EmeraldClient };
