import getUrls from 'get-urls';
import wikipedia from 'wikipedia';

const wikipediaUrlPrefix = 'https://ja.wikipedia.org/wiki/';

wikipedia.setLang('ja');

export const expandWikipediaUrl: (text: string) => string | undefined = (text) => {
  for (const url of getUrls(text)) {
    if (url.startsWith(wikipediaUrlPrefix)) {
      return url;
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

  return {title: summary.title, summary: summary.extract, thumbnailUrl: summary.thumbnail.source};
};
