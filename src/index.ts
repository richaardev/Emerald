import "dotenv/config";
import NanaClient from "./NanaClient";

const client = new NanaClient(process.env.TOKEN!, {
  intents: 46791,
  autoreconnect: true,
  defaultImageSize: 2048,
  restMode: true,
  firstShardID: 0,
});
client.start();

export { NanaClient };
