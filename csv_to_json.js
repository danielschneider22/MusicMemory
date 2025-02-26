const fs = require("fs");
const path = require("path");

const csvFilePath = path.join(__dirname, "songs.csv");
const jsonFilePath = path.join(__dirname, "songs.json");
let i = 0;

fs.readFile(csvFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading CSV file:", err);
    return;
  }

  const lines = data.split("\n").filter((line) => line.trim() !== "");
  const jsonArray = lines.map((line) => {
    const [artist, title, album, genre] = line.split(",");
    i = i + 1;

    return {
      artist: artist.trim(),
      title: title.trim(),
      album: album.trim(),
      genre: genre.trim(),
      id: i,
    };
  });

  fs.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }
    console.log("JSON file created successfully:", jsonFilePath);
  });
});
