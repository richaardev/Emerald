import EmeraldClient from "@/EmeraldClient";
import { PermissionResolvable } from "discord.js";
import RegistryModule from "../RegistryModule";
import { CommandContext } from "./context/CommandContext";
import CommandParameters from "./parameters/CommandParameters";

type CommandOptions = {
  name: string; // original command name
  aliases?: string; // aliases for the command do not work aliases for slash commands
  description?: string;

  parameters?: CommandParametersType[];
  requirements: CommandRequirements;
};

type CommandParametersType = {
  name: string;
  description: string;
};

type CommandRequirements = {
  permissions?: PermissionResolvable;
  botPermissions?: PermissionResolvable;
  dmEnabled?: boolean;
};

export abstract class Command extends RegistryModule {
  constructor(public client: EmeraldClient, public options: CommandOptions) {
    super();
  }
  abstract execute(context: CommandContext, ...args: any): void;

  async _execute(context: CommandContext) {
    let args = [];
    try {
      args = await CommandParameters.handleParameters(context, context.args, this.options.parameters as any[]);
    } catch (err) {
      context.reply(err.message);
      return
    }

    
    this.execute(context, ...args);
  }
}
