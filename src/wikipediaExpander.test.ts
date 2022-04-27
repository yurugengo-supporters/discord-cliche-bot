import {existsWikipediaUrl, expandWikipediaUrl, expandWikipediaUrlToData} from './wikipediaExpander';

// eslint-disable-next-line max-len
const wikipediaSiteSample = 'https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%B0%E3%83%AA%E3%82%AD%E3%83%A3%E3%83%83%E3%83%97';
// eslint-disable-next-line max-len
const wikipediaMobileSiteSample = 'https://ja.m.wikipedia.org/wiki/%E3%82%AA%E3%82%B0%E3%83%AA%E3%82%AD%E3%83%A3%E3%83%83%E3%83%97';
const wikipediaRefirectedSample = 'https://w.wiki/3CnA';
const netkeibaUrl = 'https://db.netkeiba.com/horse/1985102167/';

describe('Wikipedia Expander', () => {
  test('simple url', async () => {
    expect(await (expandWikipediaUrl(wikipediaSiteSample))).toBe(wikipediaSiteSample);
  });

  test('redirected url', async () => {
    expect(await (expandWikipediaUrl(wikipediaRefirectedSample))).toBe(wikipediaSiteSample);
  });

  test('mobile url', async () => {
    expect(await (expandWikipediaUrl(wikipediaMobileSiteSample))).toBe(wikipediaSiteSample);
  });

  test('url in text', async () => {
    expect(await (expandWikipediaUrl(`オグリキャップ ${wikipediaSiteSample}`))).toBe(wikipediaSiteSample);
  });

  test('wikipedia URL and other URL', async () => {
    expect(await (expandWikipediaUrl(`オグリキャップ ${netkeibaUrl} ${wikipediaSiteSample}`))).toBe(wikipediaSiteSample);
  });

  test('not wikipedia URL', async () => {
    expect(await (existsWikipediaUrl(`オグリキャップ ${netkeibaUrl}`))).toBe(false);
  });


  test('wikipedia URL', async () => {
    expect(await (existsWikipediaUrl(`オグリキャップ ${wikipediaSiteSample}`))).toBe(true);
  });

  test('wikipedia Mobile URL', async () => {
    expect(await (existsWikipediaUrl(`オグリキャップ ${wikipediaMobileSiteSample}`))).toBe(true);
  });

  test('wikipedia Redirect URL', async () => {
    expect(await (existsWikipediaUrl(`オグリキャップ ${wikipediaRefirectedSample}`))).toBe(true);
  });

  test('expand wikipedia data', async () => {
    const result = await expandWikipediaUrlToData(`オグリキャップ ${netkeibaUrl} ${wikipediaSiteSample}`);

    expect(result?.title).toBe('オグリキャップ');
  });

  test('expand wikipedia mobile data', async () => {
    const result = await expandWikipediaUrlToData(`オグリキャップ ${netkeibaUrl} ${wikipediaMobileSiteSample}`);

    expect(result?.title).toBe('オグリキャップ');
  });
});
