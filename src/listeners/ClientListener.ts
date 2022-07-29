import { Listener } from "@/structures";
import { PrefixedCommandContext } from "@/structures/command/context";
import { Logger } from "@/utils";
import { Message } from "discord.js";

export default class ClientListener extends Listener {
  onReady() {
    Logger.info(`The super ${this.client.user.username} is ready to action!`);
  }
  onMessageCreate(message: Message) {
    const prefix = "e!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().slice(prefix.length).split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    const command = this.client.commandRegistry.getCommand(commandName!);
    if (command) {
      const context = new PrefixedCommandContext(this.client, {
        message,
      });

      command.execute(context);
    }
  }
}
