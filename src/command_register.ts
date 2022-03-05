import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const apiEndpoint = `https://discord.com/api/v8/applications/${process.env.BOT_CLIENT_ID}/commands`;

const commandData = {
  'name': 'ghinvite',
  'description': 'Githubアカウントにユーザを招待します',
  'options': [{
    'type': 3, // STRING
    'name': 'github_username',
    'description': 'githubに登録するユーザ名',
    'required': true,
  }],
};

export const registerCommand = async () => {
  const response = await fetch(apiEndpoint, {
    method: 'post',
    body: JSON.stringify(commandData),
    headers: {
      'Authorization': 'Bot ' + process.env.DISCORD_TOKEN,
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();

  console.log(json);
};

registerCommand();

