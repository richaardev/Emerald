import EmeraldClient from "@/EmeraldClient";
import { Command } from "@/structures";
import { CommandContext } from "@/structures/command/context/CommandContext";

export default class PingCommand extends Command {
  constructor(client: EmeraldClient) {
    super(client, {
      name: "ping",
      requirements: {},
    });
  }

  execute(context: CommandContext): void {
    context.reply("Pong!");
  }
}
