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
  const currencyFrom =
    readlineSync.question("Type currency from (dolar): ") || "dolar";
  const currencyTo =
    readlineSync.question("Type currency to (real): ") || "real";
  const url = `https://www.google.com/search?q=${currencyFrom}+para+${currencyTo}`;

  await page.goto(url);
  // await page.screenshot({ path: "example.png" });

  const result = await page.evaluate(
    () =>
      document.querySelector(
        "#knowledge-currency__updatable-data-column > div.H07hi > table > tbody > tr:nth-child(3) > td:nth-child(1) > input"
      ).value
  );

  console.log(
    `The value of the 1 ${currencyFrom} in ${currencyTo} is: ${result}`
  );

  await browser.close();
};

robot();
