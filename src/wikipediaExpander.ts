import getUrls from 'get-urls';
import wikipedia from 'wikipedia';

const wikipediaUrlPrefix = 'https://ja.wikipedia.org/wiki/';

wikipedia.setLang('ja');

export const existsWikipediaUrl: (text: string) => boolean = (text: string) => {
  return !!expandWikipediaUrl(text);
};

export const expandWikipediaUrl: (text: string) => string | undefined = (text) => {
  for (const url of getUrls(text)) {
    const urlNormalized = url.replace('ja.m.wikipedia', 'ja.wikipedia');
    if (urlNormalized.startsWith(wikipediaUrlPrefix)) {
      return urlNormalized;
    }
  }
};

export const expandWikipediaUrlToData = async (text: string) => {
  const wikipediaUrl = expandWikipediaUrl(text);

  if (!wikipediaUrl) {
    return undefined;
  }

  const articleTitle = decodeURI(wikipediaUrl).slice(wikipediaUrlPrefix.length);

  const summary = await wikipedia.summary(articleTitle);

  return {
    title: summary.title,
    url: wikipediaUrl,
    summary: summary.extract,
    thumbnailUrl: summary.thumbnail.source};
};
