// import './style.css' // 开发调试样式用
import 'prismjs'
window.Prism = window.Prism || {}
window.Prism.manual = true

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 权限及主题等配置相关数据
 */
export const UM_NOTE_CONFIG = {
  theme: 'default',
}

// ---------------------------------------------------------------------------------------------------------------------------------

export const _languageMap = {
  lanList: [{ value: 'Html', fnKey: 'markup' }, { value: 'JavaScript', fnKey: 'javascript' }, { value: 'CSS', fnKey: 'css' }],
  lanMap: {
    html: { fnTitle: 'markup', showTitle: 'Html', },
    Html: { fnTitle: 'markup', showTitle: 'Html', },
    HTML: { fnTitle: 'markup', showTitle: 'Html', },
    javascript: { fnTitle: 'javascript', showTitle: 'JavaScript', },
    JavaScript: { fnTitle: 'javascript', showTitle: 'JavaScript', },
    css: { fnTitle: 'css', showTitle: 'CSS', },
    CSS: { fnTitle: 'css', showTitle: 'CSS', },
  },
}

/**
 * 检测language
 * 
 * @returns {String} 语言字符串
 * 
 * @example 
 * const result = getLanguage('abc')
 * @param {String} str 需要检测的字符串
 * console.log(result) // 'javascript'
 */
export const getLanguage = str => {
  if (!str) return 'javascript'
  return _languageMap.lanMap[str.toLowerCase()]?.fnTitle || 'javascript'
}
getLanguage.list = _languageMap.lanList

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 获取展示用的language名称
 * 
 * @returns {String} 语言字符串
 * 
 * @example 
 * const result = getShowingLanguage('abc')
 * @param {String} str 需要获取名称的语言字符串
 * console.log(result) // 'JavaScript'
 */
export const getShowingLanguage = str => {
  return _languageMap.lanMap[str.toLowerCase()]?.showTitle || 'JavaScript'
}

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 给一个dom元素绑定事件 
 * 
 * @param {Element} dom 要绑定事件的dom元素
 * @param {String} eventName 事件名
 * @param {Function} fn 处理函数
 * @param {(Object|Boolean)} [option = false] 配置项
 * 
 * @example _BD(dom, eventName, fn, option) 
 */
 export const _BD = (dom, eventName, fn, option = false) => {
  if(dom.addEventListener){
    dom.addEventListener(eventName, fn, option)
  }else if (dom.attachEvent){
    dom.attachEvent('on' + eventName, fn)
  }else {
    dom['on' + eventName] = fn
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 解除一个dom元素的绑定事件 
 * 
 * @param {Element} dom 要解除绑定事件的dom元素 
 * @param {String} eventName 事件名
 * @param {Function} functionName 处理函数(必须是一个函数变量名)
 * 
 * @example _unBD(dom, eventName, functionName)
 */
 export const _unBD = (dom, eventName, functionName) => {
  if(dom.attachEvent) {
    dom.detachEvent('on' + eventName, functionName)
  }else {
    dom.removeEventListener(eventName, functionName, false)
  };
}

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
 * @returns {Object} 柯里化后的方法对象 -> { getRange, haveRange, deleteContents, getEndContainer getCursorOffset: fn, setCursorOffset: fn } 
 * 
 * @example 
 * const selection = _selection() 
 * const range = selection.getRange() // 获取当前窗口的Range对象
 * const has = selection.haveRange() // 当前页面是是否存在Range对象(即是否存在光标)
 * selection.deleteContents() // 删除当前Range选中内容
 * const StartContainer = selection.getStartContainer() // 当前首光标所在的容器(必定是文本节点, 即nodeType === 3) 
 * const endContainer = selection.getEndContainer() // 当前尾光标所在的容器(必定是文本节点, 即nodeType === 3) 
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
    getStartContainer () {
      return selection.getRangeAt(0).startContainer
    },
    getEndContainer () {
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
 * 获取可编辑根元素中从光标处到根元素头部的光标总偏移量和最终的标签内容(该内容用于prism处理代码着色), 用于定位包含多种标签时的光标位置
 * 注*** 如果要查<code><span>111</span><span>222</span></code>中<span>222</span>中222末尾的光标位置, 不能是以<code></code>标签为主容器来查, 也不能在<span></span>标签中查找, 必须在文本节点222中查找, 所以这里定义了_getFrontOffset方法
 * 
 * @returns {Function} 柯里化后的主要方法 
 * 
 * @example 
 * const getFrontOffset = _getFrontOffset() 
 * getFrontOffset(root, rangeContainer, inset, callback, sign) 
 * @param {Element} root 根元素 
 * @param {Element} rangeContainer 光标所在的element元素(root容器内容为空时为root节点; 其余情况必然是text节点, 即element.nodeType === 3) 
 * @param {String} inset 光标前需要插入的字符串(比如按下tab键时, 取消了默认事件, 需要在光标前插入2个空格; 粘贴时, 需要在光标前插入粘贴的内容)
 * @param {Function} callback 回调函数, 该函数的第一个参数就是获取到的光标总偏移量, 第二个参数就是获取到的标签内容(textContent) 
 * @param {String} sign 表明是否第一次调用getFrontOffset, 用来判断是否要初始化_getFrontOffset函数内部的result变量和ok变量 
 * 注*** 参数sign是_getFrontOffset内部调用需要用到的参数, 在getFrontOffset的使用过程中[不需要]也[不能]去手动设置 
 */
export const _getFrontOffset = () => {
  let rootTextContent = ''
  let result = ''
  let ok = false
  const checkNodes = (root, rangeContainer, inset, callback, sign) => {
    if (sign !== '_is_not_first_') {
      // windows下换行符是'\r\n', 它的length是2, 但是将它作为dom元素的textContent解析时, 它的length是1, 所以在这里必须将2长度的'\r\n'替换为功能一样的'\n'
      // inset本该需要做同样的处理, 但是除了在粘贴的时候, 其它时候只会是长度为1的字符, 所以这里不处理, 放到重写的粘贴事件里面处理
      rootTextContent = root.textContent.replace(/\r\n/g, '\n')
      result = ''
      ok = false
    }
    if (rangeContainer === root) {
      ok = true
      if (sign === '_is_not_first_') { // 当不是首次执行且目标容器===根容器时, 说明是在按下enter键时页面产生了div元素且光标正停留在末尾
        // 当只有一个'\n'在rootTextContent末尾时, 不会触发换行(即'\n'后面没有内容时, 最后一个'\n'失效, 不会触发换行), 所以至少保证rootTextContent末尾有2个'\n'
        // 这里的rootTextContent为根容器的原始textContent
        if (!/\n$/.test(rootTextContent)) result += '\n'
        callback && callback(result.length, result)
      } else if (rootTextContent.length) {
        // 尼玛, 当末尾空行被删减至最后一个含有tab原生空格的时候, 页面默认会添加一个<br>标签, 导致Range.startContainer和Range.endContainer为根元素
        // 当首次执行且目标容器===根容器且根容器内有内容时, 表明原光标正停留在末尾空行, 那么直接返回根容器的(textContent的长度 + 1) 和 (rootTextContent + '\n')
        // 由于<br>在被解析后失效, 所以须在rootTextContent后加一个换行符'\n'
        // 但是当只有一个'\n'在rootTextContent末尾时, 不会触发换行(即'\n'后面没有内容时, 最后一个'\n'失效, 不会触发换行), 所以至少保证rootTextContent末尾有2个'\n'
        // 这里的rootTextContent为根容器的原始textContent
        if (/\n$/.test(rootTextContent)) {
          rootTextContent += '\n'
        } else {
          rootTextContent += '\n\n'
        }
        callback && callback(rootTextContent.length, rootTextContent)
      } else {
        // 当目标容器===根容器且根容器内没有内容时, 说明根容器下没有任何节点, 那么直接返回需要插入的内容inset的长度
        callback && callback(inset.length, inset)
      }
      return
    }
    for (let i = 0; i < root.childNodes.length; i += 1) {
      if (ok) return
      if (root.childNodes[i].nodeType !== 3) {
        checkNodes(root.childNodes[i], rangeContainer, inset, callback, '_is_not_first_')
      } else if (root.childNodes[i] === rangeContainer) {
        ok = true
        const offset = selection.getCursorOffset()
        result += root.childNodes[i].textContent.substring(0, offset)
        rootTextContent = `${result}${inset}${rootTextContent.substring(result.length)}`
        result = `${result}${inset}`
        // windows下换行符是'\r\n', 它的length是2, 但是将它作为dom元素的textContent解析时, 它的length是1, 所以在这里必须将2长度的'\r\n'替换为功能一样的'\n'
        result = result.replace(/\r\n/g, '\n')
        callback && callback(result.length, rootTextContent)
        return
      } else {
        result += root.childNodes[i].textContent
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      callback && callback(0, '')
    }
  }
  return checkNodes
}

// export const getFrontOffset = _getFrontOffset()

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
export const _getRealDomAndOffset = () => {
  let offset = 0
  let ok = false
  let handleGet = (root, cursorOffset, callback, sign) => {
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
          callback && callback(dom, temporary)
          return
        }
      } else {
        handleGet(dom, offset, callback, '_is_not_first_')
      }
    }
    if (sign !== '_is_not_first_' && !ok) {
      callback && callback(null)
    }
  }
  return handleGet
}

// export const getRealDomAndOffset = _getRealDomAndOffset()

// ---------------------------------------------------------------------------------------------------------------------------------

/**
 * 设置核心数据对象(用于页面中设置coreObj) 
 * 
 * @param {Object} target 需要设置数据的目标对象 
 * @param {String} key 需要设置的键名 
 * 
 * @example 
 * const json = []
 * const key = 'myKey'
 * setCore(json, key)
 * console.log(json)
 */
export const setCore = (target, key) => {
  target[key] = {
    root: null,
    container: null,
    inset: '',
    getFrontOffset: _getFrontOffset(),
    getRealDomAndOffset: _getRealDomAndOffset(),
  }
}

// ---------------------------------------------------------------------------------------------------------------------------------
