import {SlashCommandBuilder} from '@discordjs/builders';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

const command = new SlashCommandBuilder()
    .setName('ghinvite')
    .setDescription('Githubアカウントにユーザを招待します')
    .addStringOption((option) => option
        .setName('github_username')
        .setDescription('githubに登録するユーザ名')
        .setRequired(true),
    ).toJSON();

export const registerSlashCommands =
    async (discordToken: string, botClientId: string) => {
      const rest = new REST({version: '9'})
          .setToken(discordToken);

      try {
        const response = await rest.post(
            Routes.applicationCommands(botClientId), {body: command});
        console.log('Successfully registered application commands.');
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error(error);
      }
    };

