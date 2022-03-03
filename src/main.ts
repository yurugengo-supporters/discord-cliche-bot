// https://zenn.dev/alliana_ab2m/articles/how-to-write-discord-bot-in-typescript のサンプルコードをほぼコピペ
// TODO: オリジナルのコードが増えたらこの注釈を消す

import {Message, Client} from 'discord.js';
import {Octokit} from 'octokit';

import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({auth: process.env.GITHUB_PAT});


const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

const githubWakeKeyword = '!ghinvite';

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(githubWakeKeyword)) {
    const userName = message.content.slice(githubWakeKeyword.length).trim();

    message.reply(`Inviting ${userName}...`);

    // TODO: Githubへの招待処理
    const invitedUserResponse = await octokit.request(
        'GET /users/{username}', {
          username: userName,
        },
    );

    if (invitedUserResponse.status != 200) {
      console.log(`${userName} is not valid user`);
      return;
    }

    console.log(JSON.stringify(invitedUserResponse.data));

    const invitationResponse = await octokit.request(
        'POST /orgs/{org}/invitations', {
          org: 'yurugengo-supporters',
          invitee_id: invitedUserResponse.data.id,
        });

    console.log(JSON.stringify(invitationResponse.data));
  }
});

client.login(process.env.DISCORD_TOKEN);
