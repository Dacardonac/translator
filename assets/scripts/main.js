document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const languageSelect = document.getElementById("languageSelect");
  const translateBtn = document.getElementById("translateBtn");

  const translateText = async () => {
    const textToTranslate = inputText.value.trim();
    const targetLanguage = languageSelect.value;

    if (!textToTranslate) {
      outputText.value = "Please enter text to translate.";
      return;
    }

    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: textToTranslate,
          source: "auto",
          target: targetLanguage,
          format: "text",
        }),
      });

      if (!response.ok) throw new Error("Translation failed.");

      const data = await response.json();
      outputText.value = data.translatedText;
    } catch (error) {
      outputText.value = `Error: ${error.message}`;
    }
  };

  translateBtn.addEventListener("click", translateText);

  inputText.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      translateText();
    }
  });
});
