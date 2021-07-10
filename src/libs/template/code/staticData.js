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
const _selection = () => {
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

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取可编辑根元素中从光标处到头部的textContent, 从而可以获取到该textContent的长度, 用于定位包含多种标签的光标位置
 * 
 * @returns {Function} 
 * 
 * @example 
 * const getFrontTextcontent = _getFrontTextcontent()
 * getFrontTextcontent(childNodes, targetElement, callback) 
 * @param {NodeList} childNodes 根元素的childNodes 
 * @param {Element} rangeContainer 光标所在的element元素(必然是text节点, 即element.nodeType === 3) 
 * @param {Function} callback 回调函数, 该函数的第一个参数就是获取到的textContent 
 */
const _getFrontTextcontent = () => {
  let result = ''
  let ok = false
  const checkNodes = (nodes, rangeContainer, fn, first) => {
    if (first) {
      result = ''
      ok = false
    }
    for (let i = 0; i < nodes.length; i += 1) {
      if (ok) return
      if (nodes[i].nodeType !== 3) {
        checkNodes(nodes[i].childNodes, rangeContainer, fn)
      } else if (nodes[i] === rangeContainer) {
        ok = true
        fn && fn(result)
        return
      } else {
        result += nodes[i].textContent
      }
    }
  }
  return checkNodes
}

export const getFrontTextcontent = _getFrontTextcontent()