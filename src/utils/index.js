/**
 * 下载非同源图片 
 * 
 * @param {String} fileUrl 图片url地址 
 * @param {String} fileName 重命名名称
 * 
 * @example _downLoadFile(fileUrl, fileName) 
 */
export const _downLoadFile = (fileUrl, fileName) => {
  let ajaxObj = null
    if(window.XMLHttpRequest){
      ajaxObj = new XMLHttpRequest()
    }else{
      ajaxObj = new ActiveXObject('Microsoft.XMLHTTP')
    };
  ajaxObj.open('GET', fileUrl, true)
  ajaxObj.responseType = 'blob'
  ajaxObj.onload = () => {
    const url = window.URL.createObjectURL(ajaxObj.response);  // 将blob转为同源url
    const a = document.createElement('a')
    a.href = url
    a.download = fileName;
    a.click()
  };
  ajaxObj.send();
}

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 改变并显示移动端html的title(IOS环境下, 直接给document.title赋值的话页面上面的title不会改变) 
 * 
 * @param {String} title title名称 
 * 
 * @example _changeTitle(title) 
 */
export const _changeTitle = (title) => {
  document.title = title
  const browser = navigator.userAgent.toLowerCase()
  if(/iphone|ipad|ipod|ios/.test(browser)) { // 判断是否ios环境
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.setAttribute('src', '/favicon.ico') // 这里须加一个有效地址(加一个不影响页面视图的尽量小的图片地址即可)
    const d = function () {
      setTimeout(() => {
        iframe.removeEventListener('load', d)
        document.body.removeChild(iframe)
      })
    };
    iframe.addEventListener('load', d)
    document.body.appendChild(iframe)
  }
}

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 触发一个元素的事件时复制指定内容 
 * 
 * @param {Element} dom 被触发事件的元素 
 * @param {String} text 拷贝的内容-必须是一个变量-否则永远只会复制同一个内容 
 * 
 * @example _bindCopy(dom, text) 
 */
export const _copy = (dom, text) => {
  _BD(dom, 'copy', function() {
    event.preventDefault() // 这里必须取消默认事件, 否则无法复制
    if(event.clipboardData) {
      event.clipboardData.setData("text/plain", text)
    }else if(window.clipboardData) { // IE
      window.clipboardData.setData("Text", text)
    }else {
      console.warn('浏览器不支持, 请手动复制')
    }
  }, {once: true})
  document.execCommand('copy')
}
/**
 * vue中使用解决方案: 
 * 
 * template: 
  <div @click="toCopy" @copy="copyContent"></div>
 * methods: 
  toCopy() {
    document.execCommand('copy')
  }
  copyContent() {
    if(event.clipboardData) {
      event.preventDefault()
      event.clipboardData.setData("text/plain", '要复制的内容')
    }else if(window.clipboardData) { // IE
      window.clipboardData.setData("Text", '要复制的内容')
    }else {
      console.warn('浏览器不支持, 请手动复制')
    }
  }
 * 
 */

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 判断当前浏览器是否为IE 
 * 
 * @returns {Number|Null} 返回null或者IE版本号 
 * 
 * @example const isIE = _isIE()
 */
export const _isIE = () => {
  const info = window.navigator.userAgent
  if(info.indexOf('Trident') === -1) return null
  if(info.indexOf('MSIE 7') > 0) return 7
  if(info.indexOf('MSIE 8') > 0) return 8
  if(info.indexOf('MSIE 9') > 0) return 9
  if(info.indexOf('MSIE 10') > 0) return 10
  if(info.indexOf('rv:11') > 0) return 11
}

// ------------------------------------------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 修改名为keyframesName的keyframes样式, 返回一个方法fn 
 * 
 * @param {String} keyframesName keyframes名称 
 * 
 * @returns {Function} 返回一个修改样式的方法fn 
 * 
 * @example 
 * const edit = _editKeyframes(KEYFRAMESNAME) 
 * edit('from {...} to {...}')
 * 
 * 注* 如果在dom的className没有改变的情况下直接修改keyframes样式将无法实现动效 
 *     所以修改流程为: 去除dom的className -> 修改keyframes -> 重新给dom设置className
 */
export const _editKeyframes = (keyframesName) => {
  const sheetObj = $findKeyframesRule(keyframesName)
  return function (cssStr) {
    if (sheetObj.has) {
      const index = [...sheetObj.value.cssRules].findIndex(val => {
        return val.name === keyframesName
      })
      sheetObj.value.deleteRule(index)
      sheetObj.value.insertRule(`@keyframes ${keyframesName} ${cssStr}`)
    } else {
      sheetObj.value.insertRule(`@keyframes ${keyframesName} ${cssStr}`)
      sheetObj.has = true
    }
  }
}

/**
 * 查找keyframes所在的styleSheet 
 * 
 * @param {String} keyframesName 
 * 
 * @returns {Object} keyframes所在的styleSheet 
 * 
 * @private 这是提供给_editKeyframes方法使用的私有方法 
 */
const $findKeyframesRule = (keyframesName) => {
  //此处过滤非同源的styleSheet，因为非同源的无法访问cssRules，会报错
  let ss = Array.from(document.styleSheets).filter(styleSheet => {
    return !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  })
  for (let i = 0; i < ss.length; ++i) {
    for (let j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].type === window.CSSRule.KEYFRAMES_RULE && ss[i].cssRules[j].name === keyframesName) {
        return {
          has: true,
          value: ss[i],
        }
      }
    }
  }
  return {
    has: false,
    value: ss[0],
  }
}

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * @summary 尾递归优化的实现 
 * 目前chrome浏览器不支持尾递归优化, 可以手动实现, 也可以直接通过bable编译, 防止报栈溢出错误 
 * 
 * @param {Function} fn 需要优化的尾递归函数 
 * 
 * @returns {Function} 回调函数 
 * 
 * @example 例子在下方 ↓↓↓
 */
export const _chunkTailRecursion = (fn) => {
  let value = undefined
  let active = false
  const argArr = []
  return function handle() {
    argArr.push(arguments)
    if (!active) {
      active = true
      while (argArr.length) {
        value = fn.apply(null, argArr.shift())
      }
      active = false
      return value
    }
  };
}
/**
 * @example 
 * 原尾递归函数: 
  function sum (x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1) // 尾递归
    }
    else {
      return x
    }
  }
 * 用法: 
  const sumOptimize = _chunkTailRecursion(function (x, y) { // 参数为原尾递归函数, 但是需要把原回调改成新生成的函数
    if (y > 0) {
      return sumOptimize(x + 1, y - 1) // 这里要将原来的sum函数改成新生成的sumOptimize函数
    }
    else {
      return x
    }
  })
 * 调用: 
  sumOptimize(1, 100000)
 * 
 */

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 将扁平化数据转换成树状数据 
 * 
 * @param {Array} list 原数组 
 * @param {Array} result 结果数组 
 * @param {String|Number} originId 首层数据的父id 
 * @param {String} [idName = 'id'] 数据id的字段名 
 * @param {String} [parentIdName = 'parentId'] 数据父id的字段名 
 * 
 * @example
 * const result = [] 
 * _listToTree(list, result, originId, idName, parentIdName) 
 * console.log(result) 
 * 
 * 注: _listToTree会改变原数组, 如果不想改变原数组, 则须这样调用: _listToTree([...原数组], result, 首层父id)
 */
export const _listToTree = (list, result, originId, idName = 'id', parentIdName = 'parentId') => {
  const len = list.length
  if (len) {
    for (let i = len - 1; i >= 0; i -= 1) {
      if (list[i][parentIdName] === originId) { // 父id字段rarentId须根据实际数据来决定
        const item = list.splice(i, 1)[0]
        item.children = []
        result.push(item)
      }
    }
    const lt = result.length
    if (lt) {
      for (let j = lt - 1; j >= 0; j -= 1) {
        listToTree(list, result[j].children, result[j][idName], idName, parentIdName) // 数据id字段id须根据实际数据来决定
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 防抖
 * 
 * @param {Function} fn 需要进行防抖的函数 
 * @param {Number} [ms = 500] 防抖时间间隔(毫秒) 
 * 
 * @returns {Function} 柯里化处理后的防抖函数 
 * 
 * @example 例子在下方 ↓↓↓
 * 
 */
export const _antiShake = (fn, ms = 500) => {
  let timer = null
  return (...arg) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...arg)
    }, ms)
  }
}
/**
 * @example 
 * 需要防抖处理的函数: 
  const needFn = (a, b) => {
    console.log(a, b)
  }
 * 用法: 
  const antiShake_needFn = _antiShake(needFn, 1000)
 * 调用: 
  antiShake_needFn('aaa', 'bbb') // 打印出: 'aaa', 'bbb'
 * 
 */

// ------------------------------------------------------------------------------------------------------------------------------

/**
 * 节流
 * 
 * @param {Function} fn 需要进行节流的函数 
 * @param {Number} [ms = 500] 节流时间间隔(毫秒) 
 * 
 * @returns {Function} 柯里化处理后的节流函数 
 * 
 * @example 例子在下方 ↓↓↓
 * 
 */
export const _throttle = (fn, ms = 500) => {
  let status = true
  return (...arg) => {
    if (status) {
      status = false
      fn(...arg)
      setTimeout(() => {
        status = true
      }, ms)
    }
  }
}
/**
 * @example 
 * 需要节流处理的函数: 
  const needFn = (a, b) => {
    console.log(a, b)
  }
 * 用法: 
  const antiShake_needFn = _antiShake(needFn, 1000)
 * 调用: 
  antiShake_needFn('aaa', 'bbb') // 打印出: 'aaa', 'bbb'
 * 
 */

// ------------------------------------------------------------------------------------------------------------------------------