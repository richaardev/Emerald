import { Guild, GuildMember, User } from "discord.js";

export interface CommandContext {
  author: User;
  member?: GuildMember;
  guild?: Guild;
}
