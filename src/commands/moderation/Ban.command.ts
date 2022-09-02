import { EmeraldClient } from "@";
import { Command, CommandContext, string } from "@/structures";

export default class BanCommand extends Command {
  constructor(client: EmeraldClient) {
    super(client, {
      name: "ban",
      description: "Bane certos usuários do servidor",
      parameters: [
        string({
          name: "users",
          description: "Usuários qual vai ser banido",
        }),
      ],
    });
  }
  execute({ _interaction, t, author }: CommandContext): void {
    const users = _interaction.options.getString("users");

    console.log(users);
  }
}
