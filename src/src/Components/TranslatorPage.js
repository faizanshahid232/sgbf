import { Box } from '@mui/material';
import { useEffect } from 'react';

const TranslatorPage = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
        gaTrack: false, // Disable Google Analytics tracking
        includedLanguages: 'ar,zh-CN,en,fr,ru,es',
      },
      'google_translate_element'
    );
  };
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <Box mt={2} paddingX={2}>
      <div id="google_translate_element" />
    </Box>
  );
};

export default TranslatorPage;
