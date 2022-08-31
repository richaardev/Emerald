import EmeraldClient from "@/EmeraldClient";
import { ApplicationCommandOptionData, PermissionResolvable } from "discord.js";
import RegistryModule from "../RegistryModule";
import { CommandContext } from "./context/CommandContext";

type CommandOptions = {
  name: string; // original command name
  aliases?: string; // aliases for the command do not work aliases for slash commands
  description?: string;

  requirements: CommandRequirements;
  parameters?: ApplicationCommandOptionData[];
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
    this.execute(context);
  }
}
