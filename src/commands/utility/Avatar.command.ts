import { EmeraldClient } from "@";
import { Command, CommandContext, user } from "@/structures";
import { EmeraldEmbed } from "@/utils";
import MessageActionRowBuilder from "@/utils/builders/MessageActionRowBuilder";
import { ButtonBuilder } from "discord.js";

export default class AvatarCommand extends Command {
  constructor(client: EmeraldClient) {
    super(client, {
      name: "avatar",
      description: "Veja o seu avatar ou o avatar de alguém",
      requirements: {},
      parameters: [
        user({
          name: "user",
          description: "Usuário qual deseja ver o avatar",
        }),
      ],
    });
  }

  execute({ t, _interaction, author }: CommandContext): void {
    const usr = _interaction.options.getUser("user") ?? author;
    const embed = new EmeraldEmbed()
      .setTitle(t("commands:avatar.title", { user: usr.username }))
      .setImage(usr.displayAvatarURL({ size: 2048 }));

    if (usr === author)
      embed.setFooter({
        text: t("commands:avatar.inspiration"),
      });

    if (usr.id === this.client.user?.id)
      embed.setFooter({
        text: t("commands:avatar.myself"),
      });

    const row = new MessageActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(usr.displayAvatarURL({ extension: "png" }))
        .setLabel(t("commands:avatar")),
    );

    _interaction.reply({
      embeds: [embed],
      components: [row],
    });
  }
}
