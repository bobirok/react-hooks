import { useState, useCallback } from "react";

function oldSchoolCopy(textToCopy: string) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

export default function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (textToCopy: string) => {
    if (!navigator.clipboard.writeText) {
      oldSchoolCopy(textToCopy);
      setCopiedText(textToCopy);
    } else {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedText(textToCopy);
    }
  }, []);

  return [copiedText, copyToClipboard];
}
