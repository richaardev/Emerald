import CommandRegistry from "@/registry/CommandRegistry";
import I18nRegistry from "@/registry/I18nRegistry";
import ListenerRegistry from "@/registry/ListenerRegistry";
import { EmeraldClient } from "..";

export default class RegistryManager {
  public listeners: ListenerRegistry;
  public commands: CommandRegistry;
  public i18n: I18nRegistry;

  constructor(public client: EmeraldClient) {
    this.i18n = new I18nRegistry(client);
    this.commands = new CommandRegistry(client);
    this.listeners = new ListenerRegistry(client);
  }
}
