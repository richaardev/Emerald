import { EmbedBuilder, User } from "discord.js";

export default class EmeraldEmbed extends EmbedBuilder {
  constructor() {
    super({ color: 2476948 });
  }
  
  setAuthorUser(user: User, url?: string, tag: boolean = false): this {
    return super.setAuthor({
      name: tag ? user.tag : user.username,
      iconURL: user.displayAvatarURL(),
      url,
    });
  }

  setFooterUser(user: User, tag: boolean = false): this {
    return super.setFooter({
      text: tag ? user.tag : user.username,
      iconURL: user.displayAvatarURL(),
    });
  }
}
