const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");

// IIFE - Immediately invoked function expression
// (async () => {
// const browser = await puppeteer.launch({ headless: false });
// })();

console.log("Welcome to currency conversion Bot 💰");

const robot = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const value = readlineSync.question("Type value to convert (1): ") || "1";
  const currencyFrom =
    readlineSync.question("Type currency from (dolar): ") || "dolar";
  const currencyTo =
    readlineSync.question("Type currency to (real): ") || "real";
  const url = `https://www.google.com/search?q=${value}+${currencyFrom}+em+${currencyTo}`;

  await page.goto(url);
  // await page.screenshot({ path: "example.png" });

  const result = await page.evaluate(() => {
    try {
      return document.querySelector(
        "#knowledge-currency__updatable-data-column > div.H07hi > table > tbody > tr:nth-child(3) > td:nth-child(1) > input"
      ).value;
    } catch (error) {
      return undefined;
    }
  });

  await browser.close();

  if (!result) {
    return console.log("It was not possible to convert the value");
  }

  console.log(
    `The value of the ${value} ${currencyFrom} in ${currencyTo} is: ${result}`
  );
};

robot();
