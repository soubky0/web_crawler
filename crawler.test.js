const { normalizeURL, getURLsFromHTML } = require('./crawler');
const { test, expect } = require('@jest/globals');

test('normalizeURL strip protocol', () => {
    const input = 'https://www.example.com';
    const actual = normalizeURL(input);
    const expected = 'www.example.com';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://www.example.com/';
    const actual = normalizeURL(input);
    const expected = 'www.example.com';
    expect(actual).toEqual(expected);
});

test('normalizeURL capital letters', () => {
    const input = 'https://WWW.EXAMPLE.COM';
    const actual = normalizeURL(input);
    const expected = 'www.example.com';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const input = `
    <html>
      <body>
        <a href="https://www.example.com">Example</a>
        <a href="https://www.example.com/about">About</a>
        <a href="https://www.example.com/contact">Contact</a>
      </body>
    </html>
    `;
    const baseURL = 'https://www.example.com';
    const actual = getURLsFromHTML(input, baseURL);
    const expected = [
        'https://www.example.com/',
        'https://www.example.com/about',
        'https://www.example.com/contact'
    ];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const input = `
    <html>
      <body>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </body>
    </html>
    `;
    const baseURL = 'https://www.example.com';
    const actual = getURLsFromHTML(input, baseURL);
    const expected = [
        'https://www.example.com/about',
        'https://www.example.com/contact'
    ];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
    const input = `
    <html>
      <body>
        <a href="https://www.example.com/about">About</a>
        <a href="/contact">Contact</a>
      </body>
    </html>
    `;
    const baseURL = 'https://www.example.com';
    const actual = getURLsFromHTML(input, baseURL);
    const expected = [
        'https://www.example.com/about',
        'https://www.example.com/contact'
    ];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const input = `
    <html>
      <body>
        <a href="invalid">invalid</a>
      </body>
    </html>
    `;
    const baseURL = 'https://www.example.com';
    const actual = getURLsFromHTML(input, baseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});
