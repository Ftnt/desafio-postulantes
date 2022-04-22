const { chromium } = require("playwright");

const URL =
  "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL);

  const allData = await page.$$eval("#tabledatasii tbody tr", (row) => {
    return row.map((row) => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map((cell) => cell.textContent);
    });
  });

  console.log(allData);

  await browser.close();
})();
