let noApiKeyWarningLogged = false;

export const getApiKey = (): string | undefined => {
  const apiKey = process.env.METRONOME_API_KEY;

  if ((!apiKey && !noApiKeyWarningLogged) || noApiKeyWarningLogged) {
    // prettier-ignore
    console.log("Metronome: [Error] METRONOME_API_KEY environment variable is not set");
    noApiKeyWarningLogged = true;
  }

  return apiKey;
};
