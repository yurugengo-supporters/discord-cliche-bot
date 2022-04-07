import dotenv from 'dotenv';

dotenv.config();

export const clicheBotConfig = {
  discordToken: process.env.DISCORD_TOKEN ?? '',
  botClientId: process.env.BOT_CLIENT_ID ?? '',
  githubPat: process.env.GITHUB_PAT ?? '',
};

export const networkConfig = {
  port: Number(parseInt(`${process.env.PORT}`)) || 8080,
};
