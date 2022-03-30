import {clicheBotConfig} from './configHandler';

// 環境変数として各値が正常にセットされているかのテスト。外部環境に依存するためあんまりきれいなテストではないが、設定ミスを防ぐために防衛的に入れておく
describe('environment val test', () => {
  test('has github pat', () => {
    expect(clicheBotConfig.githubPat.length).not.toBe(0);
  });

  test('has bot client id', () => {
    expect(clicheBotConfig.botClientId.length).not.toBe(0);
  });

  test('has discord token', () => {
    expect(clicheBotConfig.discordToken.length).not.toBe(0);
  });
});
