import { useLayoutEffect, useState } from "react";

export default function usePreferredLanguage() {
  const [language, setLanguage] = useState(navigator.language);

  useLayoutEffect(() => {
    window.addEventListener("languagechange", (e) => {
      setLanguage(navigator.language);
    });

    return () => {
      window.removeEventListener("languagechange", () => {});
    };
  }, []);

  return language;
}
