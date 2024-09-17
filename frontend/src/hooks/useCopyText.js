import {useEffect, useState} from 'react';

export default function useCopyText() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  });

  const copyTextToClipboard = (text, onSuccess) => {
    navigator.clipboard.writeText(text).then(onSuccess);
  };

  const copyTextHandler = value => {
    copyTextToClipboard(value, () => setCopied(true));
  };

  return [copied, copyTextHandler];
}
