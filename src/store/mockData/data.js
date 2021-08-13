export const data = {
  code1: [
    {
      language: 'html',
      code: `<div class="my-div" style="background: salmon; display: inline-block">This is a div.</div>`
    },
    {
      language: 'javascript',
      code: `/**
 * 节流
 * 
 * @param {Function} fn 需要进行节流的函数 
 * @param {Number} [ms = 500] 节流时间间隔(毫秒) 
 * 
 * @returns {Function} 柯里化处理后的节流函数 
 * 
 * @example 例子在下方 ↓↓↓
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
  antiShake_needFn('aaa', 'bbb') // 'aaa', 'bbb'
  */`
    },
  ],
  code2: [
    {
      language: 'html',
      code: `<div class="my-div" style="background: salmon; display: inline-block">This is a div too.</div>`
    },
    {
      language: 'javascript',
      code: `/**
 * 防抖
 * 
 * @param {Function} fn 需要进行防抖的函数 
 * @param {Number} [ms = 500] 防抖时间间隔(毫秒) 
 * 
 * @returns {Function} handler 柯里化处理后的防抖函数 
 * @returns {Function} handler.finish 马上执行当前进行中的防抖函数且关闭当前进行中的定时器 
 * @returns {Function} handler.stop 马上关闭当前进行中的定时器 
 * 
 * @example 例子在下方 ↓↓↓
 * 
 */
export const _antiShake = (fn, ms = 500) => {
  let timer = null
  let argNow = null
  let padding = false
  const handler = (...arg) => {
    argNow = arg
    if (padding) clearTimeout(timer)
    padding = true
    timer = setTimeout(() => {
      padding = false
      fn(...arg)
    }, ms)
  }
  handler.finish = () => {
    if (padding) {
      clearTimeout(timer)
      padding = false
      fn(...argNow)
    }
  }
  handler.stop = () => {
    if (padding) {
      padding = false
      clearTimeout(timer)
    }
  }
  return handler
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
  * 调用finish()方法: 
  antiShake_needFn.finish() 
  * 调用stop()方法: 
  antiShake_needFn.stop() 
  */`
    },
  ],
}