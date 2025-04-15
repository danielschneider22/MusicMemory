const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const csvFilePath = path.join(__dirname, "songs.csv");
const jsonFilePath = path.join(__dirname, "songs.json");

fs.readFile(csvFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading CSV file:", err);
    return;
  }

  parse(
    data,
    {
      trim: true,
      skip_empty_lines: true,
    },
    (err, records) => {
      if (err) {
        console.error("Error parsing CSV:", err);
        return;
      }

      const jsonArray = records.map(([artist, title, album, genre], index) => ({
        artist,
        title,
        album,
        genre,
        id: index + 1,
      }));

      fs.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2), (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
          return;
        }
        console.log("JSON file created successfully:", jsonFilePath);
      });
    }
  );
});
