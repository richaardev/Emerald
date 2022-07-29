import EmeraldClient from "@/EmeraldClient";
import { Command } from "@/structures";
import Registry from "@/structures/Registry";

export default class CommandRegistry extends Registry {
  public override modules: Command[];

  constructor(client: EmeraldClient) {
    super(client, {
      path: "src/commands",
      autoReload: process.env.PRODUCTION == undefined,
    });

    this.modules = [];
    this.loadAll(this.path);
  }
  getCommand(name: string) {
    return this.modules.find((command) => command.options.name === name);
  }
}
