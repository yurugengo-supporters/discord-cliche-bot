import {gojize, ungojize} from './gojize';


describe('gojize', () => {
  test('gojize ディスコード', async () => {
    const src = 'ディスコード';
    const result = gojize(src);

    expect(result).toBe('ヅァシヶョデ');
  });

  test('gojize ゆる言語学ラジオ（漢字混じり）', async () => {
    const src = 'ゆる言語学ラジオ';
    const result = gojize(src);

    expect(result).toBe('やら言語学ョザエ');
  });
});

describe('ungojize', () => {
  test('ungojize ディスコード', async () => {
    const src = 'ヅァシヶョデ';
    const result = ungojize(src);
    // 仕様上逆変換は完璧ではない
    expect(result).toBe('ディスコラド');
  });

  test('ungojize ゆる言語学ラジオ（漢字混じり）', async () => {
    const src = 'やら言語学ョザエ';
    const result = ungojize(src);

    expect(result).toBe('ゆる言語学ラジオ');
  });
});
