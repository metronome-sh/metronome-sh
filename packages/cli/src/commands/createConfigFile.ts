import path from "path";
import fs from "fs";

export default function createConfigFile({
  useTypeScript,
}: {
  useTypeScript: boolean;
}) {
  const configModulePath = path.dirname(
    require.resolve("@metronome-sh/config")
  );

  const filename = useTypeScript
    ? "metronome.config.ts"
    : "metronome.config.js";

  const configPath = path.resolve(configModulePath, `./${filename}`);
  const destinationPath = path.resolve(process.cwd(), `${filename}`);

  if (fs.existsSync(destinationPath)) {
    // prettier-ignore
    console.error(`❌ ${filename} already exists. Please remove it before running this command.`);
    return;
  }

  fs.copyFileSync(configPath, destinationPath);

  console.log(`✅ ${filename} created. `);
}
