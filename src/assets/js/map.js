const _lhjsLanguageMaps = () => {
  const json = {
    'html': true,
    'css': true,
    'javascript': true,
  }
  return (str) => {
    return json[str] ? str : 'javascript'
  }
}


export const lhjsLanguage = _lhjsLanguageMaps()