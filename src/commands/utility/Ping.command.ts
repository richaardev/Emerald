import EmeraldClient from "@/EmeraldClient";
import { Command } from "@/structures";
import { CommandContext } from "@/structures/command/context/CommandContext";

export default class PingCommand extends Command {
  constructor(client: EmeraldClient) {
    super(client, {
      name: "ping",
      description: "Veja o ping do bot",
      requirements: {},
    });
  }

  execute(context: CommandContext): void {
    context.reply(context.t("commands:ping.response", { ms: this.client.ws.ping }));
  }
}
