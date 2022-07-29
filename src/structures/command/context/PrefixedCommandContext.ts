import EmeraldClient from "@/EmeraldClient";
import { CommandContext, CommandContextData } from "./CommandContext";

export class PrefixedCommandContext extends CommandContext {
  constructor(public client: EmeraldClient, data: CommandContextData) {
    super(data);
  }

  reply(options: string) {
    this._message.reply(options);
  }
}
