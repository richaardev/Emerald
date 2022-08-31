import { Listener } from "@/structures";
import { SlashCommandContext } from "@/structures/command/context";
import { Logger } from "@/utils";
import { Interaction } from "discord.js";

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
        t: this.client.registry.i18n.getFixedT("en-US"),
      });

      command.execute(context);
    }
  }
}
