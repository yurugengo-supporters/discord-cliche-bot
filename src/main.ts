// https://zenn.dev/alliana_ab2m/articles/how-to-write-discord-bot-in-typescript のサンプルコードをほぼコピペ
// TODO: オリジナルのコードが増えたらこの注釈を消す

import {Message, Client} from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

const githubWakeKeyword = '!ghinvite'

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(githubWakeKeyword)) {
    const userName = message.content.slice(githubWakeKeyword.length).trim()

    message.channel.send(`Inviting ${userName}...`);

    //TODO: Githubへの招待処理
  }
});

client.login(process.env.TOKEN);
