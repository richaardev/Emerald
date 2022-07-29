import {
  APIInteractionGuildMember,
  CommandInteraction,
  Guild,
  GuildMember,
  Message,
  User,
} from "discord.js";

export type CommandContextData = {
  message?: Message;
  interaction?: CommandInteraction;
};

export abstract class CommandContext {
  public _message: Message | undefined;
  public _interaction: CommandInteraction | undefined;
  public author: User;
  public member?: GuildMember | APIInteractionGuildMember | undefined | null;
  public guild?: Guild | null;

  constructor(data: CommandContextData) {
    this._interaction = data.interaction;
    this._message = data.message;

    this.author = (data.message?.author ?? data.interaction?.user)!;
    this.member = data.message?.member ?? data.interaction?.member;
    this.guild = data.message?.guild ?? data.interaction?.guild;

    if (this.author == null) {
      throw new Error("WTF???");
    }
  }

  // TODO: Add more options
  abstract reply(options: string): void;
}
