import { Guild, GuildMember, Message, User } from "discord.js";

export type CommandContextData = {
  message: Message;
};

export abstract class CommandContext {
  public _message: Message;
  public author: User;
  public member?: GuildMember | null;
  public guild?: Guild | null;

  constructor(data: CommandContextData) {
    this._message = data.message;
    this.author = data.message.author;
    this.member = data.message.member;
    this.guild = data.message.guild;
  }

  // TODO: Add more options
  abstract reply(options: string): void;
}
