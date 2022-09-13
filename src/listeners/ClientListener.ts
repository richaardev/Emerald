import { Listener, SlashCommandContext } from "@/structures";
import { Logger } from "@/utils";
import { Interaction } from "discord.js";

export default class ClientListener extends Listener {
  onReady() {
    const users = this.client.users.cache.size;
    const guilds = this.client.guilds.cache.size;
    Logger.info(
      `${this.client.user.username} is is now online with ${guilds} guilds and ${users} users!`,
    );
  }

  onInteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = this.client.registries.commandsRegistry.getCommand(interaction.commandName);

    if (command) {
      const context = new SlashCommandContext(this.client, {
        interaction,
        t: this.client.registries.i18nRegistry.getFixedT("en-US"),
      });

      command.execute(context);
    }
  }
}
