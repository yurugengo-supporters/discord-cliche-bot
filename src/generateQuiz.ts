// eslint-disable-next-line max-len
import {ActionRowBuilder, ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from 'discord.js';
import {setTimeout as wait} from 'node:timers/promises';


// eslint-disable-next-line require-jsdoc
export function* generateQuiz(input: string): Generator<string, number, unknown> {
  for (let index = 1; index <= input.length; index++) {
    yield input.substring(0, index);
  }

  return input.length;
}

export const yuruquizProc = async (interaction: ChatInputCommandInteraction) => {
  const modal = new ModalBuilder()
      .setCustomId('statementModal')
      .setTitle('Set Statement');

  const statementInput = new TextInputBuilder()
      .setCustomId('statement')
      .setLabel('問題文を入力してください')
      .setStyle(TextInputStyle.Paragraph);
  const row = new ActionRowBuilder<TextInputBuilder>().addComponents(statementInput);
  modal.addComponents(row);

  await interaction.showModal(modal);
};
