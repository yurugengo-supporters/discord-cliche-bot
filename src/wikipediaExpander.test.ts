import {expandWikipediaUrl, expandWikipediaUrlToData} from './wikipediaExpander';

// eslint-disable-next-line max-len
const wikipediaSiteSample = 'https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%B0%E3%83%AA%E3%82%AD%E3%83%A3%E3%83%83%E3%83%97';
const netkeibaUrl = 'https://db.netkeiba.com/horse/1985102167/';

describe('simple url', () => {
  test('simple url', () => {
    expect(expandWikipediaUrl(wikipediaSiteSample)).toBe(wikipediaSiteSample);
  });

  test('url in text', () => {
    expect(expandWikipediaUrl(`オグリキャップ ${wikipediaSiteSample}`)).toBe(wikipediaSiteSample);
  });

  test('not wikipedia URL', () => {
    expect(expandWikipediaUrl(`オグリキャップ ${netkeibaUrl} ${wikipediaSiteSample}`)).toBe(wikipediaSiteSample);
  });

  test('expand wikipedia data', () => {
    expect(expandWikipediaUrlToData('オグリキャップ')?.title).toBe('オグリキャップ');
  });
});
