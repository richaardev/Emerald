import { RubyClient } from "@";
import { Command, CommandContext, string } from "@/structures";
import MessageActionRowBuilder from "@/utils/builders/MessageActionRowBuilder";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";

export default class BanCommand extends Command {
  constructor(client: RubyClient) {
    super(client, {
      name: "ban",
      description: "Bane certos usuários do servidor",
      parameters: [
        string({
          name: "users",
          description: "Usuários qual vai ser banido",
        }),
      ],
    });
  }
  async execute({ _interaction, t, author }: CommandContext) {
    const reason = _interaction.options.getString("reason") ?? "No provided reason";
    const softReason = `Banned by ${author.tag} (${author.id}) - ${reason}`;
    const usersStr = _interaction.options.getString("users")!;
    const matches = usersStr.matchAll(/<@!?([0-9]+)>/g);
    const idArray = this.getIds(matches);
    const promises: Promise<GuildMember | undefined>[] = idArray.map(
      (e: string) =>
        new Promise(async (resolve, reject) => {
          let usr = await _interaction.guild?.members.cache.get(e);
          if (!usr) reject(undefined);
          resolve(usr);
        }),
    );
    const members = (await Promise.allSettled([...promises]))
      .filter((result) => result.status !== "rejected")
      .map((result) => (result as PromiseFulfilledResult<GuildMember>).value);

    if (members.length < 1)
      return _interaction.reply({ content: t("commands:ban.users_not_found") });

    if (members.length >= 20)
      return _interaction.reply({ content: t("commands:ban.users_ban_limit") });

    const row = new MessageActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(t("commands:ban.confirm"))
        .setStyle(ButtonStyle.Primary)
        .setCustomId("ban_confirmation"),
    );

    _interaction.reply({
      content: t("commands:ban.ban_confirmation"),
      components: [row],
    });

    

    // for (let member of members) {
    //   member.ban({
    //     deleteMessageDays: 7,
    //     reason: softReason,
    //   });
    // }
  }

  getIds(iterator: IterableIterator<RegExpMatchArray>) {
    let ids = [];
    let match = iterator.next();
    while (match.value) {
      ids.push(match.value[1]);
      match = iterator.next();
    }
    return ids;
  }
}
