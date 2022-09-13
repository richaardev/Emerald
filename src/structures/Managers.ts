import { RubyClient } from "@";
import CollectorManager from "@/managers/CollectorManager";

export default class Managers {
  public collectors: CollectorManager;

  constructor(public client: RubyClient) {
    this.collectors = new CollectorManager(client);
  }
}
