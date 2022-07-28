import EmeraldClient from "@/EmeraldClient";

type CommandOptions = {};

export class Command {
  constructor(public client: EmeraldClient, public options: CommandOptions) {
    
  }
}
