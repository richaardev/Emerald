import RubyClient from "@/RubyClient";
import { Command, CommandContext } from "@/structures";

export default class PingCommand extends Command {
  constructor(client: RubyClient) {
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
