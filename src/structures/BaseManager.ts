import EmeraldClient from "@/EmeraldClient";

export default class BaseManager {
  constructor(public client: EmeraldClient) {}

  load(): Promise<boolean> | boolean {
    return false;
  }
}
