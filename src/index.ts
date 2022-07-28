import "dotenv/config";
import EmeraldClient from "./EmeraldClient";

const client = new EmeraldClient(process.env.TOKEN!, {
  intents: 46791,
});
client.start();

export { EmeraldClient };
