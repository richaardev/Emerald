import "dotenv/config";
import EmeraldClient from "./EmeraldClient";

const client = new EmeraldClient(process.env.TOKEN!, {
  intents: 46791,
  autoreconnect: true,
  defaultImageSize: 2048,
  restMode: true,
  firstShardID: 0,
});
client.start();

export { EmeraldClient };
