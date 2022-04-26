import getUrls from 'get-urls';

export const expandWikipediaUrl: (text: string) => string | undefined = (text) => {
  for (const url of getUrls(text)) {
    if (url.startsWith('https://ja.wikipedia.org/wiki/')) {
      return url;
    }
  }
};

export const expandWikipediaUrlToData: (text: string) =>
{title: string, summary: string, thumbnailUrl:string} | undefined = (text) => {
  for (const url of getUrls(text)) {
    if (url.startsWith('https://ja.wikipedia.org/wiki/')) {
      return {title: text, summary: text, thumbnailUrl: text};
    }
  }
};
