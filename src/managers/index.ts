import NanaClient from "@/NanaClient";
import { join } from "path";
import ListenerManager from "./ListenerManager";

export default class Manager {
  public listener: ListenerManager;

  constructor(public client: NanaClient) {
    this.listener = new ListenerManager(client, { path: join(__dirname, "../", "listeners") });
  }

  async load(): Promise<void> {
    await this.listener.load();
  }
}
