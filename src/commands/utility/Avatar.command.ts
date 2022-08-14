import EmeraldClient from "@/EmeraldClient";
import { Command } from "@/structures";
import { CommandContext } from "@/structures/command/context/CommandContext";
import { user } from "@/structures/command/parameters/types";
import { User } from "discord.js";

export default class AvatarCommand extends Command {
  constructor(client: EmeraldClient) {
    super(client, {
      name: "avatar",
      description: "Veja o seu avatar ou o avatar de alguém",
      requirements: {},
      parameters: [
        user({
          description: "Usuário qual deseja você deseja ver o avatar",
        }),
      ],
    });
  }

  execute(context: CommandContext, user: User): void {
    context.reply(`received ${user}`);
  }
}
