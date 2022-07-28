import EmeraldClient from "@/EmeraldClient";
import { Logger } from "@/utils";
import { EventEmitter } from "node:events";
import { readdirSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import chokidar from "chokidar";
import RegistryModule from "./RegistryModule";

type RegistryOptions = {
  path: string;
  autoReload: boolean;
};

export default class Registry extends EventEmitter {
  public path: string;
  public modules: RegistryModule[];

  constructor(public client: EmeraldClient, public options: RegistryOptions) {
    super();

    this.path = options.path || process.exit(1);
    this.modules = [];

    if (options.autoReload) this.startWatch(this.path);
  }

  async load(path: string) {
    try {
      delete require.cache[require.resolve(path)];
      const module = new (await import(path)).default(this.client);

      module.__path = path;
      this.modules.push(module);

      this.emit("load", module);
      return true;
    } catch (err) {
      if (err instanceof Error) Logger.error(`Error while loading ${path}: ${err.stack}`);
      return false;
    }
  }

  loadAll(path: string) {
    readdirSync(path).forEach((file) => {
      const fullpath = resolve(path, file);
      if (lstatSync(fullpath).isDirectory()) {
        return this.loadAll(fullpath);
      }
      this.load(fullpath);
    });
  }

  deleteModule(object: RegistryModule) {
    const index = this.modules.findIndex((module) => module.__path === object.__path);
    this.modules.splice(index, 1);
    this.emit("delete", object);
  }

  async reloadModule(object: RegistryModule) {
    try {
      const module = this.modules.filter((m) => m.__path === object.__path)[0];
      await this.deleteModule(module);
      await this.load(module.__path);
    } catch (err) {
      if (err instanceof Error) Logger.error("Error while trying to reload module: ", err.stack);
    }
  }

  startWatch(watchPath: string) {
    Logger.debug("Starting watcher for ", this.constructor.name);
    const watcher = chokidar.watch(watchPath, {
      interval: 500,
    });

    watcher.on("change", (path) => this.reloadModule(this.findByFilename(path)));
  }

  findByFilename(path: string) {
    return this.modules.filter((module) => module.__path.endsWith(path))[0];
  }
}
