import { GatewayIntentBits, Partials } from "discord.js";
import "dotenv/config";
import EmeraldClient from "./EmeraldClient";
import { Logger } from "./utils";

process.on("unhandledRejection", (err) => Logger.error((err as Error)?.stack ?? err));
process.on("uncaughtException", (err) => Logger.error(err.stack));

const client = new EmeraldClient(process.env.TOKEN!, {
  partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.ThreadMember],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  failIfNotExists: false,
  allowedMentions: {
    parse: ["users"],
    repliedUser: true,
  },
});

client.start();
