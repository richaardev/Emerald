import { CommandContext } from "./CommandContext";

export class PrefixedCommandContext extends CommandContext {
  reply(options: string) {
    this._message!.reply(options);
  }
}
