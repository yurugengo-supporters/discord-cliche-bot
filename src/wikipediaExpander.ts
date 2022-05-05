import getUrls from 'get-urls';
import wikipedia from 'wikipedia';
import fetch from 'node-fetch';


const wikipediaUrlPrefix = 'https://ja.wikipedia.org/wiki/';

wikipedia.setLang('ja');

export const existsWikipediaUrl = async (text: string) => {
  return (await expandWikipediaUrl(text)).length !== 0;
};

export const expandWikipediaUrl = async (text: string) => {
  const redirectedUrls = await Promise.all(
      Array.from(getUrls(text))
          .map((url) => url.replace('ja.m.wikipedia', 'ja.wikipedia'))
          .map(async (url) => (await fetch(url, {method: 'GET'})).url));

  const filteredUrls = redirectedUrls.filter( (url) => url.startsWith(wikipediaUrlPrefix));

  return filteredUrls;
};

export const expandWikipediaUrlToData = async (text: string) => {
  const wikipediaUrls = await expandWikipediaUrl(text);

  if (!wikipediaUrls) {
    return undefined;
  }

  const summaries = await Promise.all(
      wikipediaUrls.map(async (url) => {
        const title = decodeURI(url).slice(wikipediaUrlPrefix.length);
        return await wikipedia.summary(title);
      },
      ));

  return summaries.map((summary) => ({
    title: summary.title,
    url: summary.content_urls.desktop.page,
    summary: summary.extract,
    thumbnailUrl: summary.thumbnail?.source,
  }));
};
