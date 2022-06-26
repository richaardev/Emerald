import { ListenerManagerOptions } from "@/@types";
import NanaClient from "@/NanaClient";
import { BaseListener, BaseManager } from "@/structures";
import { Logger } from "@/utils";
import glob from "glob";
import path from "path";

export default class ListenerManager extends BaseManager {
  constructor(client: NanaClient, public options: ListenerManagerOptions) {
    super(client);
  }

  override load(): boolean {
    const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
    type ListenerClassType = { default: new (client: NanaClient) => BaseListener };

    glob("src/listeners/**/*.{js,ts}", (err, files) => {
      if (err) throw err;
      files.forEach(async (file) => {
        import(file).then(({ default: ListenerClass }: ListenerClassType) => {
          const listener = new ListenerClass(this.client);
          const methods = Object.getOwnPropertyNames(ListenerClass.prototype).filter((method) =>
            method.startsWith("on"),
          );
          methods.forEach((method) => {
            const eventName = uncapitalize(method.replace("on", ""));
            try {
              // @ts-ignore
              this.client.on(eventName, (...args) => listener[method](...args));
              Logger.info("Listeners Initialized");
              return true;
            } catch (err) {}
          });
        });
      });
    });
    return false;
  }
}
