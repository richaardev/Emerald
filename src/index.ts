import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import EmeraldClient from "./EmeraldClient";
import { Logger } from "./utils";

process.on("unhandledRejection", (err) => Logger.error((err as Error).stack ?? err));
process.on("uncaughtException", (err) => Logger.error(err.stack));

const client = new EmeraldClient(process.env.TOKEN!, {
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});
client.start();

export { EmeraldClient };
