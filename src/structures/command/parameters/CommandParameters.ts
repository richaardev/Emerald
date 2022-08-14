import { CommandContext } from "../context";

export default class CommandParameters {
  static async handleParameters(ctx: CommandContext, args: string[], parameters: any[]): any[] {
    let result = [];

    if (parameters) {
      for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const arg = args[i];

        const parsedParameter = await parameter.parse!(ctx, arg, parameter);
        result.push(parsedParameter);
      }
    }
    return result;
  }
}
