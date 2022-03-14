import {Message, Client, Interaction, CacheType, CommandInteraction} from 'discord.js';

import {createDummyServer} from './dummyServer';
import {fetchUserData, authorizeToGithub, inviteUser} from './githubCommands';

import {clicheBotConfig, networkConfig} from './configHandler';
import {githubCommand, registerSlashCommands} from './commandRegister';

authorizeToGithub(clicheBotConfig.githubPat);

createDummyServer(networkConfig.port);

registerSlashCommands(
    clicheBotConfig.discordToken, clicheBotConfig.botClientId);

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
});

const githubCommandProc = async (
    interaction: CommandInteraction<CacheType>) => {
  const userName = interaction.options.getString('github_username');
  if (!userName) return;

  const invitedUser = await fetchUserData(userName);
  if (!invitedUser) {
    console.log('invalid user');
    interaction.reply(`${userName}は存在しないGithubアカウントです。`);
    return;
  }

  const invitationResponse = await inviteUser(invitedUser?.id);

  if (!invitationResponse) {
    interaction.reply(`${userName}の招待に失敗しました。すでにメンバーになっている可能性があります。`);
    return;
  }

  interaction.reply(`${userName}を組織に招待しました。`);
};

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const {commandName} = interaction;

  if (commandName === githubCommand) {
    githubCommandProc(interaction);
  }
});

client.login(clicheBotConfig.discordToken);
