import EmeraldClient from "@/EmeraldClient";
import { CommandContext, CommandContextData } from ".";

export class SlashCommandContext extends CommandContext {
  constructor(public client: EmeraldClient, data: CommandContextData) {
    super(data);
  }
  reply(options: any): void {
    this._interaction!.reply(options);
  }
}
