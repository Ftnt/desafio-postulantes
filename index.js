const { chromium } = require("playwright");
const fs = require("fs");

const URL =
  "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";

const arrayToObject = (array) => {
  return array.map((dato) => {
    return {
      id: dato[0],
      razon_social: dato[1],
      pais: dato[2],
      datos_inscripcion: dato[3],
      vigencia_hasta: dato[4],
      datos_ultima_actualizacion: dato[5],
      estado: dato[6],
    };
  });
};

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

  const result = JSON.stringify(
    {
      count: allData.length,
      url: URL,
      results: arrayToObject(allData),
    },
    null,
    2
  );

  fs.writeFile("./files/SII.json", result, (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await browser.close();
})();
