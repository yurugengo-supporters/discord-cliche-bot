import {Message, Client, CacheType, ChatInputCommandInteraction, GatewayIntentBits} from 'discord.js';
import axios from 'axios';
import {createDummyServer} from './dummyServer.js';
import {fetchUserData, authorizeToGithub, inviteUser} from './githubCommands.js';

import {clicheBotConfig, networkConfig} from './configHandler.js';
// eslint-disable-next-line max-len
import {githubCommandName, kotobankCommandName, quizCommandName, registerSlashCommands, rollDiceCommandName} from './commandRegister.js';
import {existsWikipediaUrl, expandWikipediaUrlToData} from './wikipediaExpander.js';
import {generateQuiz, yuruquizProc} from './generateQuiz.js';
import {setTimeout as wait} from 'node:timers/promises';


const LABO_GUILD_ID = '947390529145032724';

authorizeToGithub(clicheBotConfig.githubPat);

createDummyServer(networkConfig.port);

registerSlashCommands(
    clicheBotConfig.discordToken, clicheBotConfig.botClientId);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
  console.log('Ready!');
  console.log(client.user?.tag ?? 'undefined user');
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
});

const githubCommandProc = async (
    interaction: ChatInputCommandInteraction<CacheType>) => {
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

const wikipediaCommandProc = async (message: Message) => {
  if (!(await existsWikipediaUrl(message.content))) {
    return;
  }

  const summaries = await expandWikipediaUrlToData(message.content);
  if (!summaries || summaries.length === 0) {
    return;
  }

  message.reply({embeds: summaries.map((summary) => ({
    author: {
      name: 'Wikipedia',
      url: summary.url,
      icon_url: 'https://media.snl.no/media/36894/standard_Wikipedia-logo-v2.png',
    },
    title: summary.title,
    url: summary.url,
    description: summary.summary,
    image: {
      url: summary.thumbnailUrl,
    },
  }))});
};


client.on('interactionCreate', async (interaction) => {
  if (interaction.isModalSubmit()) {
    if (interaction.customId == 'statementModal') {
      const statement = interaction.fields.getTextInputValue('statement');

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
    }
  }

  if (!interaction.isChatInputCommand()) return;

  const {commandName} = interaction;

  // eslint-disable-next-line max-len
  console.log(`interaction occured on ${interaction.guild?.name} : ${interaction.guildId}`);
  if (interaction.guildId === LABO_GUILD_ID) {
    console.log('You\'re on Yurugengo Labo');
  }


  if (commandName === githubCommandName) {
    githubCommandProc(interaction);
  }

  if (commandName === quizCommandName) {
    yuruquizProc(interaction);
  }

  if (commandName === rollDiceCommandName) {
    const diceNumber = interaction.options.getInteger('dice_number') ?? 4;
    const diceSide = interaction.options.getInteger('dice_side') ?? 6;
    const results = [...Array(diceNumber)].map(() => Math.floor(Math.random() * diceSide) + 1);
    const elementsStr = results.reduce((acc, item) => `${acc ? acc + ', ' : ''}${item}`, '');
    const elementsSum = results.reduce((acc, item) => acc + item, 0);
    const message = `${diceNumber}d${diceSide}\n ${elementsStr} : ${elementsSum}`;

    interaction.reply(message);
  }

  if (commandName === kotobankCommandName) {
    const searchWord = interaction.options.getString('word');
    if (!searchWord) {
      interaction.reply('単語を指定してください。');
      return;
    }

    const url = `https://kotobank.jp/word/${encodeURIComponent(searchWord)}`;
    try {
      await axios.get(url);
      // エラーがなくこの行に到達する場合は場合はURLが存在すると思ってOK
      interaction.reply(`https://kotobank.jp/word/${searchWord}`);
    } catch (e) {
      interaction.reply(`${searchWord}はコトバンクでは見つかりませんでした。`);
    }
  }
});

client.on('message', async (message) => {
  if (message.guildId === LABO_GUILD_ID) {
    // ここに実験用のコードを書く
  }

  await wikipediaCommandProc(message);
});

client.login(clicheBotConfig.discordToken);
