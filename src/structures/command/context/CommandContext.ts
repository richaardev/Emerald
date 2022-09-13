import { RubyClient } from "@";
import { FixedT } from "@/registry/I18nRegistry";
import {
  APIInteractionGuildMember,
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  User,
} from "discord.js";

export type CommandContextData = {
  interaction: ChatInputCommandInteraction;
  t?: FixedT;
  args?: string[];
};

export abstract class CommandContext {
  public client: RubyClient;
  public _interaction: ChatInputCommandInteraction;
  public author: User;
  public member?: GuildMember | APIInteractionGuildMember | undefined | null;
  public guild?: Guild | null;
  public t: FixedT;
  public args: string[];

  constructor(client: RubyClient, data: CommandContextData) {
    this.client = client;
    this._interaction = data.interaction;
    this.args = data.args ?? [];

    this.author = data.interaction?.user!;
    this.member = data.interaction?.member;
    this.guild = data.interaction?.guild;
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
