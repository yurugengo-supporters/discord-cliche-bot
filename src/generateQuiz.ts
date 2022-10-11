import {CommandInteraction} from 'discord.js';
import {setTimeout as wait} from 'node:timers/promises';


// eslint-disable-next-line require-jsdoc
function* generateQuiz(input: string): Generator<string, number, unknown> {
  for (let index = 1; index <= input.length; index++) {
    yield input.substring(0, index);
  }

  return input.length;
}

export const yuruquizProc = async (interaction: CommandInteraction) => {
  const statement = interaction.options.getString('statement');
  if (!statement || statement.length == 0) {
    interaction.reply('問題文を指定してください。');
    return;
  }

  interaction.reply('問題です！！');
  await wait(1000);

  for (const value of generateQuiz(statement)) {
    interaction.editReply(value);

    await wait(1000);
  }
};
