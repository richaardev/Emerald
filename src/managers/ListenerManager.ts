import EmeraldClient from "@/EmeraldClient";
import { BaseListener, BaseManager } from "@/structures";
import { Logger } from "@/utils";
import glob from "fast-glob";

export default class ListenerManager extends BaseManager {
  override async load(): Promise<boolean> {
    const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
    type ListenerClassType = { default: new (client: EmeraldClient) => BaseListener };
    const entries = await glob("src/listeners/**/*.{ts,js}");

    for (const file of entries) {
      import(`${process.cwd()}/${file}`).then(({ default: ListenerClass }: ListenerClassType) => {
        const listener = new ListenerClass(this.client);
        const methods = Object.getOwnPropertyNames(ListenerClass.prototype)
          .filter((method) => method.startsWith("on"));
        for (const method of methods) {
          const eventName = uncapitalize(method.replace("on", ""));
          // @ts-ignore
          this.client.on(eventName, (...args) => listener[method](...args));
        }
      });
    }

    Logger.info("Listeners Initialized");
    return true;
  }
}
