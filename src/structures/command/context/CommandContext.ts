import { EmeraldClient } from "@";
import { FixedT } from "@/registry/I18nRegistry";
import { APIInteractionGuildMember, CommandInteraction, Guild, GuildMember, Message, User } from "discord.js";

export type CommandContextData = {
  message?: Message;
  interaction?: CommandInteraction;
  t?: FixedT;
  args?: string[];
};

export abstract class CommandContext {
  public client: EmeraldClient;
  public _message: Message | undefined;
  public _interaction: CommandInteraction | undefined;
  public author: User;
  public member?: GuildMember | APIInteractionGuildMember | undefined | null;
  public guild?: Guild | null;
  public t: FixedT;
  public args: string[];

  constructor(client: EmeraldClient, data: CommandContextData) {
    this.client = client;
    this._message = data.message;
    this._interaction = data.interaction;
    this.args = data.args ?? [];

    this.author = (data.message?.author ?? data.interaction?.user)!;
    this.member = data.message?.member ?? data.interaction?.member;
    this.guild = data.message?.guild ?? data.interaction?.guild;
    this.t =
      data.t ??
      function fixedT(translation: string) {
        return translation;
      };

    if (this.author == null) {
      throw new Error("WTF???");
    }
  }
  // TODO: Add more options
  abstract reply(options: string): void;

  isSlashCommand(): boolean {
    return this._interaction !== null;
  }
}
