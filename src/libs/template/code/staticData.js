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
 * @returns {Object} 柯里化后的方法对象 -> { getRange, haveRange, deleteContents, getContainer getCursorOffset: fn, setCursorOffset: fn } 
 * 
 * @example 
 * const selection = _selection() 
 * const range = selection.getRange() // 获取当前窗口的Range对象
 * const has = selection.haveRange() // 当前页面是是否存在Range对象(即是否存在光标)
 * selection.deleteContents() // 删除当前Range选中内容
 * const endContainer = selection.getContainer() // 当前光标所在的容器(必定是文本节点, 即nodeType === 3) 
 * const position = selection.getCursorOffset() // 当前光标偏移量 
 * selection.setCursorOffset(element, cursorOffset) // 在element内设置光标位置 
 * @param {Element} element 需要设置光标的dom元素 
 * @param {Number} cursorOffset 需要设置的光标位置 
 */
const _selection = () => {
  const selection = window.getSelection()
  return {
    getRange () {
      return selection.getRangeAt(0)
    },
    haveRange () {
      return selection.rangeCount > 0
    },
    deleteContents () {
      selection.getRangeAt(0).deleteContents()
    },
    getContainer () {
      return selection.getRangeAt(0).endContainer
    },
    getCursorOffset () {
      return selection.getRangeAt(0).endOffset
    },
    setCursorOffset (element, cursorOffset) {
      if (!cursorOffset && cursorOffset !== 0) return
      const range = document.createRange()
      range.selectNodeContents(element)
      range.setStart(element, cursorOffset)
      range.setEnd(element, cursorOffset)
      selection.removeAllRanges()
      selection.addRange(range)
    },
  }
}

export const selection = _selection()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取可编辑根元素中从光标处到根元素头部的光标总偏移量, 用于定位包含多种标签的光标位置
 * 注*** 如果要查<code><span>111</span><span>222</span></code>中<span>222</span>中222末尾的光标位置, 不能是以<code></code>标签为主容器来查, 也不能在<span></span>标签中查找, 必须在文本节点222中查找, 所以这里定义了_getFrontOffset方法
 * 
 * @returns {Function} 柯里化后的主要方法 
 * 
 * @example 
 * const getFrontOffset = _getFrontOffset() 
 * getFrontOffset(root, targetElement, callback, sign) 
 * @param {Element} root 根元素 
 * @param {Element} rangeContainer 光标所在的element元素(必然是text节点, 即element.nodeType === 3) 
 * @param {Function} callback 回调函数, 该函数的第一个参数就是获取到的textContent 
 * @param {String} sign 表明是否第一次调用getFrontOffset, 用来判断是否要初始化_getFrontOffset函数内部的result变量和ok变量 
 * 注*** 参数sign是_getFrontOffset内部调用需要用到的参数, 在getFrontOffset的使用过程中[不需要]也[不能]去手动设置 
 */
const _getFrontOffset = () => {
  let rootTextContent = ''
  let result = ''
  let ok = false
  const checkNodes = (root, rangeContainer, inset, fn, sign) => {
    // 当目标容器===根容器时, 说明根容器下没有任何节点, 那么直接返回需要插入的内容inset
    if (rangeContainer === root) {
      fn && fn(inset.length, inset)
      return
    }
    if (sign !== '_is_not_first_') {
      rootTextContent = root.textContent
      result = ''
      ok = false
    }
    for (let i = 0; i < root.childNodes.length; i += 1) {
      if (ok) return
      if (root.childNodes[i].nodeType !== 3) {
        checkNodes(root.childNodes[i], rangeContainer, inset, fn, '_is_not_first_')
      } else if (root.childNodes[i] === rangeContainer) {
        ok = true
        const offset = selection.getCursorOffset() // 粘贴时这里可能不准
        result += root.childNodes[i].textContent.substring(0, offset)
        rootTextContent = `${result}${inset}${rootTextContent.substring(result.length)}`
        result = `${result}${inset}`
        fn && fn(result.length, rootTextContent)
        return
      } else {
        result += root.childNodes[i].textContent
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      fn && fn(0, '')
    }
  }
  return checkNodes
}

export const getFrontOffset = _getFrontOffset()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 根据主容器中光标总偏移量来获取光标所在的目标元素和光标偏移量
 * 
 * @returns {Function} 柯里化后的主要方法 
 * 
 * @example 
 * const getRealDomAndOffset = _getRealDomAndOffset() 
 * getRealDomAndOffset(root, cursorOffset, callback, sign) 
 * @param {Element} root 根元素 
 * @param {Number} cursorOffset 光标总偏移量(即主容器中目标元素之前所有文本节点内容的长度), 该参数是从getFrontOffset方法中得到 
 * @param {Function} callback 回调函数, 该函数的第一个参数就是需要获取的目标元素, 第二个参数就是目标元素的光标偏移量 
 * @param {String} sign 表明是否第一次调用getFrontTextcontent, 用来判断是否要初始化_getRealDomAndOffset函数内部的result变量和ok变量 
 * 注*** 参数sign是_getRealDomAndOffset内部调用需要用到的参数, 在getFrontTextcontent的使用过程中[不需要]也[不能]去手动设置 
 */
const _getRealDomAndOffset = () => {
  let offset = 0
  let ok = false
  let handleGet = (root, cursorOffset, fn, sign) => {
    if (sign !== '_is_not_first_') {
      offset = cursorOffset
      ok = false
    }
    for (let i = 0; i < root.childNodes.length; i += 1) {
      if (ok) return
      const dom = root.childNodes[i]
      if (dom.nodeType === 3) {
        const ctxLength = dom.textContent.length
        const temporary = offset // 暂存当前的的剩余偏移量offset, 如果后面offset减去ctxLength的值小于等于0, 则这个temporary就是目标元素真正的光标偏移量
        offset -= ctxLength
        if (offset <= 0) { // 当offset的值小于等于0的时候, 当前文本节点dom就是光标所在的目标元素, temporary就是目标元素真正的光标偏移量
          ok = true
          fn && fn(dom, temporary)
          return
        }
      } else {
        handleGet(dom, offset, fn, '_is_not_first_')
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      fn && fn(null)
    }
  }
  return handleGet
}

export const getRealDomAndOffset = _getRealDomAndOffset()