const fs = require("fs");
const path = require("path");

// File paths
const INPUT_FILE_PATH = path.join(__dirname, "../src/assets/input.json");
const OUTPUT_FILE_PATH = path.join(__dirname, "../src/assets/ml_data.json");

// Read and transform data
try {
  // Read the input file
  const rawData = fs.readFileSync(INPUT_FILE_PATH, "utf-8");
  const oldData = JSON.parse(rawData);

  // Initialize new format
  const newData = {};

  // Perform transformation
  for (const randomKey in oldData) {
    const dateEntries = oldData[randomKey];

    for (const dateString in dateEntries) {
      const entry = dateEntries[dateString];

      // Parse the date
      const parsedDate = new Date(dateString);

      // Validate and transform
      if (!isNaN(parsedDate.getTime())) {
        newData[parsedDate.toISOString()] = {
          date: parsedDate,
          ml: {
            year: parseInt(entry.year, 10),
            date: parseInt(entry.date, 10),
            month: entry.mlMasaName,
            star: entry.mlNakshatraName,
          },
        };
      } else {
        console.warn(`Invalid date string encountered: ${dateString}`);
      }
    }
  }

  // Write the transformed data to the output file
  fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(newData, null, 2), "utf-8");

  console.log(`Transformation complete. Output written to ${OUTPUT_FILE_PATH}`);
} catch (error) {
  console.error("An error occurred during the transformation process:", error.message);
}
