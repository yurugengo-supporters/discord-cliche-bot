import getUrls from 'get-urls';
import wikipedia from 'wikipedia'

const wikipediaUrlPrefix = 'https://ja.wikipedia.org/wiki/';
export const expandWikipediaUrl: (text: string) => string | undefined = (text) => {
  for (const url of getUrls(text)) {
    if (url.startsWith(wikipediaUrlPrefix)) {
      return url;
    }
  }
};

export const expandWikipediaUrlToData: (text: string) =>
{title: string, summary: string, thumbnailUrl:string} | undefined = (text) => {
  const wikipediaUrl = expandWikipediaUrl(text);

  if (!wikipediaUrl) {
    return undefined;
  }

  const articleTitle = decodeURI(wikipediaUrl).slice(wikipediaUrlPrefix.length);

  return {title: articleTitle, summary: articleTitle, thumbnailUrl: articleTitle};
};
