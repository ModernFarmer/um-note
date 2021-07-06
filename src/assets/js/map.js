const _codeMap = () => {
  const map = {
    'html': true,
    'javascript': true,
    'css': true,
  }
  return str => {
    return map[str] ? str : 'javascript'
  }
}

export const codeMap = _codeMap()