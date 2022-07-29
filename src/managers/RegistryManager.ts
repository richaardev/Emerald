import CommandRegistry from "@/registry/CommandRegistry";
import ListenerRegistry from "@/registry/ListenerRegistry";
import { EmeraldClient } from "..";

export default class RegistryManager {
  public listeners: ListenerRegistry;
  public commands: CommandRegistry;

  constructor(public client: EmeraldClient) {
    this.commands = new CommandRegistry(client);
    this.listeners = new ListenerRegistry(client);
  }
}
