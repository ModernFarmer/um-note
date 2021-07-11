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
 * const has = selection.haveRange() // 当前页面是是否存在Range对象(即是否存在光标)
 * const endContainer = selection.getContainer() // 当前光标所在的容器(必定是文本节点, 即nodeType === 3) 
 * const position = selection.getCursorPosition() // 当前光标位置 
 * selection.setCursorPosition(element, position) // 在element内设置光标位置 
 * @param {Element} element 需要设置光标的dom元素 
 * @param {Number} position 需要设置的光标位置 
 */
const _selection = () => {
  const selection = window.getSelection()
  return {
    haveRange () {
      return selection.rangeCount > 0
    },
    getContainer () {
      return selection.getRangeAt(0).endContainer
    },
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
      range.setStart(element, cursorPsition)
      range.setEnd(element, cursorPsition)
      selection.removeAllRanges()
      selection.addRange(range)
    },
  }
}

export const selection = _selection()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取可编辑根元素中从光标处到头部的textContent, 从而可以获取到该textContent的长度, 用于定位包含多种标签的光标位置
 * 注*** 如果要查<code><span>111</span><span>222</span></code>中<span>222</span>中222末尾的光标位置, 不能是以<code></code>标签为主容器来查, 也不能在<span></span>标签中查找, 必须在文本节点222中查找, 所以这里定义了_getFrontTextcontent方法
 * 
 * @returns {Function} 柯里化后的主要方法 
 * 
 * @example 
 * const getFrontTextcontent = _getFrontTextcontent()
 * getFrontTextcontent(childNodes, targetElement, callback, sign) 
 * @param {NodeList} childNodes 根元素的childNodes 
 * @param {Element} rangeContainer 光标所在的element元素(必然是text节点, 即element.nodeType === 3) 
 * @param {Function} callback 回调函数, 该函数的第一个参数就是获取到的textContent 
 * @param {String} sign 表明是否第一次调用getFrontTextcontent, 用来判断是否要初始化_getFrontTextcontent函数内部的result变量和ok变量
 * 注*** 参数sign是_getFrontTextcontent内部调用需要用到的参数, 在getFrontTextcontent的使用过程中[不需要]也[不能]去手动设置
 */
const _getFrontTextcontent = () => {
  let result = ''
  let ok = false
  const checkNodes = (nodes, rangeContainer, fn, sign) => {
    if (sign !== '_is_not_first_') {
      result = ''
      ok = false
    }
    for (let i = 0; i < nodes.length; i += 1) {
      if (ok) return
      if (nodes[i].nodeType !== 3) {
        checkNodes(nodes[i].childNodes, rangeContainer, fn, '_is_not_first_')
      } else if (nodes[i] === rangeContainer) {
        ok = true
        fn && fn(result)
        return
      } else {
        result += nodes[i].textContent
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      fn && fn('')
    }
  }
  return checkNodes
}

export const getFrontTextcontent = _getFrontTextcontent()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 根据主容器中光标偏移量来确定光标所在的element元素(目标节点)
 * 
 * @returns {Function} 柯里化后的主要方法 
 * 
 * @example 
 * const getRealDom = _getRealDom()
 * getRealDom(childNodes, cursorOffset, callback, sign)
 * @param {NodeList} childNodes 根元素的childNodes 
 * @param {Number} cursorOffset 光标偏移量(即主容器中目标节点之前所有文本节点内容的长度, 注*: 不包括目标节点的偏移量), 该参数是从getFrontTextcontent方法中得到 
 * @param {Function} callback 回调函数, 该函数的第一个参数就是需要获取的目标节点 
 * @param {String} sign 表明是否第一次调用getFrontTextcontent, 用来判断是否要初始化_getFrontTextcontent函数内部的result变量和ok变量
 * 注*** 参数sign是_getFrontTextcontent内部调用需要用到的参数, 在getFrontTextcontent的使用过程中[不需要]也[不能]去手动设置
 */
const _getRealDom = () => {
  let length = 0
  let ok = false
  let handleGet = (nodes, len, fn, sign) => {
    if (sign !== '_is_not_first_') {
      length = len
      ok = false
    }
    for (let i = 0; i < nodes.length; i += 1) {
      if (ok) return
      const dom = nodes[i]
      if (dom.nodeType === 3) {
        if (length > 0) {
          const ctxLength = dom.textContent.length
          length -= ctxLength
        } else {
          ok = true
          fn && fn(dom)
          return
        }
      } else {
        handleGet(dom.childNodes, length, fn, '_is_not_first_')
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      fn && fn(null)
    }
  }
  return handleGet
}

export const getRealDom = _getRealDom()