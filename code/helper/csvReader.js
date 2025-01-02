import * as fs from "fs";
import { parse } from "csv-parse";

export async function readCSVData(filePath) {
  var csvData = [];
  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(
        parse({ columns: true, relax_quotes: true, ltrim: true, rtrim: true })
      )
      .on("data", function (csvrow) {
        //do something with csvrow
        csvData.push(csvrow);
      })
      .on("end", function () {
        resolve(csvData);
        //do something with csvData
        console.log("End of Reading");
      });
  });
}
