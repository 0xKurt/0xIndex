import fs from "fs";
import fetch from "node-fetch";
import https from "https";

export async function downloadJson(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error downloading JSON from ${url}: ${error}`);
    throw error;
  }
}

export async function downloadImage(imageUrl, filePath) {
  const file = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download image: ${response.statusCode} ${response.statusMessage}`,
            ),
          );
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve);
        });

        file.on("error", (error) => {
          fs.unlinkSync(filePath);
          reject(error);
        });
      })
      .on("error", (error) => {
        fs.unlinkSync(filePath);
        reject(error);
      });
  });
}
