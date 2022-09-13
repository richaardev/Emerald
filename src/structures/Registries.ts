import { CommandRegistry, I18nRegistry, ListenerRegistry } from "@/registry";

import { RubyClient } from "..";

export class Registries {
  public listenersRegistry: ListenerRegistry;
  public commandsRegistry: CommandRegistry;
  public i18nRegistry: I18nRegistry;

  constructor(public client: RubyClient) {
    this.i18nRegistry = new I18nRegistry(client);
    this.commandsRegistry = new CommandRegistry(client);
    this.listenersRegistry = new ListenerRegistry(client);
  }
}
