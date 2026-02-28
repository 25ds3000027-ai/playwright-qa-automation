const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 34; seed <= 43; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(td => parseFloat(td.innerText.replace(/[^0-9.-]/g, "")))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum =`, sum);

    total += sum;
  }

  console.log("FINAL TOTAL:", total);

  await browser.close();
})();
