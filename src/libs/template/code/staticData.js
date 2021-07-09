/**
 * 检测language
 * 
 * @returns {Function} 柯里化后的检测函数 -> getLanguage
 * 
 * @example 
 * const getLanguage = _codeMap()
 * const result = getLanguage('abc')
 * @param {String} 需要检测的字符串
 * console.log(result) // 'javascript'
 */
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

export const getLanguage = _codeMap()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取随机key
 * 
 * @returns {Function} 柯里化后的获取函数 -> getKey
 * 
 * @example 
 * const getKey = _keyMap()
 * const result = getKey()
 * console.log(result)
 */
const _keyMap = () => {
  const map = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  return () => {
    let baseStr = ''
    for (let i = 0; i < 5; i += 1) {
      baseStr += map[Math.floor(Math.random() * 52)]
    }
    return `${baseStr}_${Math.ceil(Math.random() * 1000000)}`
  }
}

export const getKey = _keyMap()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 光标定位
 * 
 * @returns {Object} 柯里化后的方法对象 -> { getCursorPosition: fn, setCursorPosition: fn } 
 * 
 * @example 
 * const selection = _selection() 
 * const position = selection.getCursorPosition() // 当前光标位置 
 * selection.setCursorPosition(element, position) // 在element内设置光标位置 
 * @param {Element} element 需要设置光标的dom元素 
 * @param {Number} position 需要设置的光标位置 
 */
function _selection () {
  const selection = window.getSelection()
  return {
    getCursorPosition () {
      if (selection.rangeCount > 0) {
        return selection.getRangeAt(0).endOffset
      }
      return null
    },
    setCursorPosition (element, cursorPsition) {
      if (!cursorPsition && cursorPsition !== 0) return
      const range = document.createRange()
      range.selectNodeContents(element)
      range.setStart(element.childNodes[0], cursorPsition)
      range.setEnd(element.childNodes[0], cursorPsition)
      selection.removeAllRanges()
      selection.addRange(range)
    },
  }
}

export const selection = _selection()