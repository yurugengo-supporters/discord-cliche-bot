import {Message, Client} from 'discord.js';
import {Octokit} from 'octokit';

import dotenv from 'dotenv';

dotenv.config();

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

const githubWakeKeyword = '!ghinvite';

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(githubWakeKeyword)) {
    const userName = message.content.slice(githubWakeKeyword.length).trim();

    const invitedUser = await fetchUserData(userName);
    if (!invitedUser) {
      console.log('invalid user');
      message.reply(`${userName}は存在しないGithubアカウントです。`);
      return;
    }

    const invitationResponse = await inviteUser(invitedUser?.id);

    if (!invitationResponse) {
      message.reply(`${userName}の招待に失敗しました。すでにメンバーになっている可能性があります。`);
      return;
    }

    message.reply(`${userName}を組織に招待しました。`);
  }
});

client.login(process.env.DISCORD_TOKEN);
