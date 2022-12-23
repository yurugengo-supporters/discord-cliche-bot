import {gojize} from './gojize';


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
