import EmeraldClient from "@/EmeraldClient";
import { Listener } from "@/structures";
import Registry from "@/structures/Registry";
import { join } from "path";
import { fileURLToPath } from "url";

export default class ListenerRegistry extends Registry {
  constructor(client: EmeraldClient) {
    super(client, {
      path: join(fileURLToPath(import.meta.url), "../../", "listeners"),
      autoReload: process.env.PRODUCTION == undefined,
    });

    this.on("load", this.onLoad);
    this.on("delete", this.onDelete);

    this.loadAll(this.path);
  }

  async onLoad(listener: Listener) {
    listener.load();
  }

  async onDelete(listener: Listener) {
    listener.unload();
  }
}
