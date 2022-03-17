import {clicheBotConfig} from './configHandler';

test.skip('has github pat', () => {
  expect(clicheBotConfig.githubPat.length).not.toBe(0);
});

test.skip('has bot client id', () => {
  expect(clicheBotConfig.botClientId.length).not.toBe(0);
});

test.skip('has discord token', () => {
  expect(clicheBotConfig.discordToken.length).not.toBe(0);
});
