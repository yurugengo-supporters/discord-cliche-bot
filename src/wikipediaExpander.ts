import getUrls from 'get-urls';
import wikipedia from 'wikipedia';
import fetch from 'node-fetch';


const wikipediaUrlPrefix = 'https://ja.wikipedia.org/wiki/';

wikipedia.setLang('ja');

export const existsWikipediaUrl: (text: string) => Promise<boolean> = async (text: string) => {
  return !!(await expandWikipediaUrl(text));
};

export const expandWikipediaUrl: (text: string) => Promise<string | undefined> = async (text) => {
  for (const url of getUrls(text)) {
    const urlNormalized = url.replace('ja.m.wikipedia', 'ja.wikipedia');

    const response = await fetch(urlNormalized, {method: 'GET'});
    const finalUrl = response.url;

    console.log(finalUrl);

    if (finalUrl.startsWith(wikipediaUrlPrefix)) {
      return finalUrl;
    }
  }
};

export const expandWikipediaUrlToData = async (text: string) => {
  const wikipediaUrl = await expandWikipediaUrl(text);

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
