import { CommandContext } from ".";

export class SlashCommandContext extends CommandContext {
  reply(options: any): void {
    this._interaction!.reply(options);
  }
}
