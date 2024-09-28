const { crawlPage } = require('./crawler');

async function main() {

    if (process.argv.length != 3)  {
        console.log("Usage: node main.js <url>");
        process.exit(1);
    }
    const baseURL = process.argv[2];
    console.log("start crawling", baseURL);

    const pages = await crawlPage(baseURL, baseURL, {});

    for(const page in pages) {
        console.log(page);
    }
}

main();