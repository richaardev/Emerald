import { Listener } from "@/structures";
import { PrefixedCommandContext, SlashCommandContext } from "@/structures/command/context";
import { Logger } from "@/utils";
import EmeraldEmbed from "@/utils/EmeraldEmbed";
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

    if (new RegExp(`<@!?${this.client.user.id}>`).test(message.content)) {
      message.channel.send({
        embeds: [
          new EmeraldEmbed()
            .setAuthorUser(message.author)
            .setDescription(["Hey!"].join("\n"))
            .setThumbnail(this.client.user.displayAvatarURL()),
        ],
      });
      return;
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().slice(prefix.length).split(/ +/g);
    const commandName = args.shift()?.toLowerCase();

    const command = this.client.registry.commands.getCommand(commandName!);
    if (command) {
      const t = this.client.registry.i18n.getFixedT("en-US");
      const context = new PrefixedCommandContext(this.client, {
        message,
        args,
        t,
      });

      command._execute(context);
    }
  }
}
