import EmeraldClient from "@/EmeraldClient";
import ListenerManager from "./ListenerManager";

export default class Manager {
  public listener: ListenerManager;

  constructor(public client: EmeraldClient) {
    this.listener = new ListenerManager(client);
  }

  async load(): Promise<void> {
    await this.listener.load();
  }
}
