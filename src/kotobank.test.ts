import axios, {AxiosError} from 'axios';

describe('kotobank', () => {
  test('OK', async () => {
    const url = `https://kotobank.jp/word/${encodeURIComponent('言語学')}`;

    const response = await axios.get(url);
    expect(response.status).toBe(200);
  });

  test('NG', async () => {
    const url = `https://kotobank.jp/word/${encodeURIComponent('ゆる言語学')}`;

    try {
      await axios.get(url);
    } catch (e) {
      expect(e).toBeInstanceOf(AxiosError);
      if (e instanceof AxiosError) {
        expect(e.response?.status).toBe(404);
      }
    }
  });
});
