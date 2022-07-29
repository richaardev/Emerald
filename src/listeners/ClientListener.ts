import { Listener } from "@/structures";
import { PrefixedCommandContext, SlashCommandContext } from "@/structures/command/context";
import { Logger } from "@/utils";
import { Interaction, Message } from "discord.js";

export default class ClientListener extends Listener {
  onReady() {
    Logger.info(`The super ${this.client.user.username} is ready to action!`);
  }

  onInteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = this.client.registry.commands.getCommand(interaction.commandName);

    if (command) {
      const context = new SlashCommandContext(this.client, {
        interaction,
      });
      
      command.execute(context);
    }
  }

  onMessageCreate(message: Message) {
    const prefix = "e!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().slice(prefix.length).split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    const command = this.client.registry.commands.getCommand(commandName!);
    if (command) {
      const context = new PrefixedCommandContext(this.client, {
        message,
      });

      command.execute(context);
    }
  }
}
