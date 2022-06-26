import NanaClient from "@/NanaClient";

export default class BaseManager {
  constructor(public client: NanaClient) {}

  load(): boolean {
    return false;
  }
}
