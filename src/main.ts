import {Message, Client} from 'discord.js';
import {Octokit} from 'octokit';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// GAEがサーバーをリスンしていないとそもそもアプリとして認識してくれないので、ダミーのレスポンスを返すようにしておく
const PORT = Number(parseInt(`${process.env.PORT}`)) || 8080;
const app = express();

app.get('/', (_req, res) => {
  res.send('🤖Bot is running!!🤖');
});

export const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const octokit = new Octokit({auth: process.env.GITHUB_PAT});

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

const fetchUserData = async (userName: string) => {
  try {
    const invitedUserResponse = await octokit.request(
        'GET /users/{username}', {
          username: userName,
        },
    );

    if (invitedUserResponse.status != 200) {
      console.log(`${userName} is not valid user`);
      return null;
    }

    return invitedUserResponse.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const inviteUser = async (userId: number) => {
  try {
    const invitationResponse = await octokit.request(
        'POST /orgs/{org}/invitations', {
          org: 'yurugengo-supporters',
          invitee_id: userId,
        });

    return invitationResponse;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const githubCommandName = 'ghinvite';

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const {commandName} = interaction;

  if (commandName === githubCommandName) {
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
  }
});

client.login(process.env.DISCORD_TOKEN);
