const { url } = require('inspector');
const { JSDOM } = require('jsdom');

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  // check for external links
  if (baseUrlObj.hostname !== currentUrlObj.hostname)
    return pages;
  // check for visited pages
  const normalizedCurrentUrl = normalizeURL(currentUrl)
  if (pages[normalizedCurrentUrl] > 0){
    pages[normalizedCurrentUrl]++;
    return pages;
  } 

  pages[normalizedCurrentUrl] = 1;
  console.log('crawling', currentUrl);
  try {
    const resp = await fetch(currentUrl);
    if (resp.status > 399) {
      console.log('failed to fetch', currentUrl, 'with status', resp.status);
      return pages;
    }

    const contentType = resp.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log('non-html page', currentUrl);
      return pages;
    }

    const htmlBody = await resp.text();
    const nextUrls = getURLsFromHTML(htmlBody, currentUrl);

    for (const nextUrl of nextUrls){
      pages = crawlPage(baseUrl, nextUrl, pages)
    }
  } catch (error) {
    console.log('error', error.message, 'on page', currentUrl); 
    return pages;
  }
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const url = `${urlObj.hostname}${urlObj.pathname}`;
  if (url.slice(-1) === '/') {
    return url.slice(0, -1);
  }
  return url;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody);
  const linkElments = dom.window.document.querySelectorAll('a');
  for (const linkElment of linkElments) {
    if (linkElment.href.slice(0, 1) === '/') {
      // relative
      try{
        const urlObj = new URL(`${baseURL}${linkElment.href}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.error(e);
      }
    }
    else {
      // absolute
      try{
        const urlObj = new URL(linkElment.href);
        urls.push(urlObj.href);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};