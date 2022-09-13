import { RegistryModule } from "@/registry";
import RubyClient from "@/RubyClient";
import { ApplicationCommandOptionData, PermissionResolvable } from "discord.js";

import { CommandContext } from "./context/CommandContext";

type CommandOptions = {
  name: string; // original command name
  description?: string;

  requirements?: CommandRequirements;
  parameters?: ApplicationCommandOptionData[];
};

type CommandRequirements = {
  permissions?: PermissionResolvable;
  botPermissions?: PermissionResolvable;
  dmEnabled?: boolean;

  onlyDev?: boolean;
};

export abstract class Command extends RegistryModule {
  constructor(public client: RubyClient, public options: CommandOptions) {
    super();
  }

  abstract execute(context: CommandContext): any;
  async _execute(context: CommandContext) {
    this.execute(context);
  }
}
