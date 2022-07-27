import Client from "@/EmeraldClient";
import { EventListeners } from "eris";

type PascalCase<S> = S extends `${infer Char}${infer Rest}` ? `on${Capitalize<Char>}${Rest}` : S;
type ClientEvents = {
  [key in keyof EventListeners as PascalCase<key>]?: EventListeners[key]
};

// @ts-ignore - Has no properties in common
export default class BaseListener implements ClientEvents {
  constructor(public client: Client) {}
}
