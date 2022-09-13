import RubyClient from "@/RubyClient";
import { Command } from "@/structures";
import { ApplicationCommandDataResolvable, ApplicationCommandType } from "discord.js";
import { join } from "path";
import { fileURLToPath } from "url";
import { Registry } from "./";

export default class CommandRegistry extends Registry {
  public override modules: Command[];

  constructor(client: RubyClient) {
    super(client, {
      path: join(fileURLToPath(import.meta.url), "../../", "commands"),
      autoReload: process.env.PRODUCTION == undefined,
    });

    this.registerSlashCommands = this.registerSlashCommands.bind(this);
    this.client.once("ready", this.registerSlashCommands);

    this.modules = [];
    this.loadAll(this.path);
  }

  private async registerSlashCommands() {
    const { commands } = this.client.application!;
    const oldSlashCommands = await commands.fetch();

    this.modules.forEach((command) => {
      const oldSlash = oldSlashCommands.get(command.options.name);

      let newCommandData: ApplicationCommandDataResolvable = {
        name: command.options.name,
        description: command.options.description ?? "No description",
        type: ApplicationCommandType.ChatInput,
        dmPermission: command.options.requirements?.dmEnabled ?? true,
        options: command.options.parameters ?? [],
      };
      if (oldSlash) {
        oldSlash.edit(newCommandData);
      } else {
        commands.create(newCommandData);
      }
    });
  }

  getCommand(name: string) {
    return this.modules.find((command) => command.options.name === name);
  }
}
