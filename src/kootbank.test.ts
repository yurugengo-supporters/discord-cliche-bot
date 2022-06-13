import axios from 'axios';

describe('kotobank', () => {
  test('OK', async () => {
    const response = await axios.get('https://kotobank.jp/word/%E3%83%86%E3%82%B9%E3%83%88');
    expect(response.status).toBe(200);
  });

  test('NG', async () => {
    const response = await axios.get('https://kotobank.jp/word/%E3%82%86%E3%82%8B%E8%A8%80%E8%AA%9E%E5%AD%A6');
    expect(response.status).toBe(404);
  });
});
