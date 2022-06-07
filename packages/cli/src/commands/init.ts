import path from "path";
import fs from "fs";

export default function init() {
  const configModulePath = path.dirname(
    require.resolve("@metronome-sh/config")
  );
  const configPath = path.resolve(configModulePath, "./metronome.config.js");
  const destinationPath = path.resolve(process.cwd(), "metronome.config.js");

  if (fs.existsSync(destinationPath)) {
    console.error(
      "metronome.config.js already exists. Please remove it before running this command."
    );
    return;
  }

  fs.copyFileSync(configPath, destinationPath);

  console.log("metronome.config.js created.");
}
