import getUrls from 'get-urls';

export const expandWikipediaUrl: (text: string) => string | undefined = (text) => {
  for (const url of getUrls(text)) {
    return url;
  }
};
