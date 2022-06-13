import {SlashCommandBuilder} from '@discordjs/builders';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

export const githubCommandName = 'ghinvite';
const inviteCommand = new SlashCommandBuilder()
    .setName(githubCommandName)
    .setDescription('Githubアカウントにユーザを招待します')
    .addStringOption((option) => option
        .setName('github_username')
        .setDescription('githubに登録するユーザ名')
        .setRequired(true),
    ).toJSON();

export const rollDiceCommandName = 'rolldice';
const rollDiceCommand = new SlashCommandBuilder()
    .setName(rollDiceCommandName)
    .setDescription('指定した数のサイコロを振り、出目を出力します')
    .addIntegerOption((option) => option
        .setName('dice_number')
        .setDescription('サイコロの数。デフォルトは4')
        .setRequired(false))
    .addIntegerOption((option) => option
        .setName('dice_side')
        .setDescription('サイコロの面数。デフォルトは6')
        .setRequired(false))
    .toJSON();

export const kotobankCommandName = 'kotobank';
const kotobankCommand = new SlashCommandBuilder()
    .setName(kotobankCommandName)
    .setDescription('コトバンクの検索を行います')
    .addStringOption((option) => option
        .setName('word')
        .setDescription('コトバンクで検索する単語')
        .setRequired(true),
    ).toJSON();


export const registerSlashCommands =
    async (discordToken: string, botClientId: string) => {
      const rest = new REST({version: '9'})
          .setToken(discordToken);

      for (const command of [inviteCommand, rollDiceCommand, kotobankCommand]) {
        try {
          const response = await rest.post(
              Routes.applicationCommands(botClientId), {body: command});
          console.log(`Successfully registered application commands: ${command.name}.`);
          console.log(JSON.stringify(response));
        } catch (error) {
          console.error(error);
        }
      }
    };

