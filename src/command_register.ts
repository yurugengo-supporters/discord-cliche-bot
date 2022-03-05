import dotenv from 'dotenv';
import {SlashCommandBuilder} from '@discordjs/builders';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

dotenv.config();

const botClientId = `${process.env.BOT_CLIENT_ID}`;

const command = new SlashCommandBuilder()
    .setName('ghinvite')
    .setDescription('Githubアカウントにユーザを招待します')
    .addStringOption((option) => option
        .setName('github_username')
        .setDescription('githubに登録するユーザ名')
        .setRequired(true),
    ).toJSON();


const rest = new REST({version: '9'})
    .setToken(`${process.env.DISCORD_TOKEN}`);

rest.post(Routes.applicationCommands(botClientId), {body: command})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

