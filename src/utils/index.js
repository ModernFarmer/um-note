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
    if(event.clipboardData) {
      event.preventDefault() // 这里必须取消默认事件, 否则无法复制
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
template:
  <div @click="toCopy" @copy="copyContent"></div>
methods:
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
 * 
 * @param {*} keyframeName 
 * @returns 
 */
// 修改名为keyframeName的keyframes样式, 返回一个方法fn
/* 
调用: const fn = _editKeyframes(keyfranes名称)
      fn('{from {...} to {...}}')
*/
/*
注意: 如果在dom的className没有改变的情况下直接修改keyframes样式将无法实现动效
      所以修改流程为: 去除dom的className -> 修改keyframes -> 重新给dom设置className
*/
export const _editKeyframes = (keyframeName) => {
  const sheetObj = $findKeyframesRule(keyframeName)
  return function (cssStr) {
    if (sheetObj.has) {
      const index = [...sheetObj.value.cssRules].findIndex(val => {
        return val.name === keyframeName
      })
      sheetObj.value.deleteRule(index)
      sheetObj.value.insertRule(`@keyframes ${keyframeName} ${cssStr}`)
    } else {
      sheetObj.value.insertRule(`@keyframes ${keyframeName} ${cssStr}`)
      sheetObj.has = true
    }
  }
}

// 查找keyframes所在的styleSheet
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

// 尾回调优化的实现 --- 目前chrome浏览器不支持尾回调优化, 可以手动实现, 也可以直接通过bable编译, 防止报栈溢出错误
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
/*
调用:

原尾回调函数:
function sum (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1) // 尾递归
  }
  else {
    return x
  }
}
用法: const sumOptimize = _chunkTailRecursion(function (x, y) { // 参数为原尾回调函数, 但是需要把原回调改成新生成的函数
  if (y > 0) {
    return sumOptimize(x + 1, y - 1) // 这里要将原来的sum函数改成新生成的sumOptimize函数
  }
  else {
    return x
  }
})
调用: sumOptimize(1, 100000)
*/

// ------------------------------------------------------------------------------------------------------------------------------

// 将扁平化数据转换成树状数据
/*
调用:
  const result = []
  _listToTree(原数组, result, 首层父id, 数据id的字段名, 数据的父id字段名)
  console.log(result)
  *注: _listToTree会改变原数组, 如果不想改变原数组, 则须这样调用: _listToTree([...原数组], result, 首层父id)
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
