import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import { UmNote, UmNoteConfig } from '@/libs' // 本地调试
// import { UmNote, UmNoteConfig } from 'um-note'

/**
 * 所有被支持的语言
 * 
 * @returns {Array} 所有被支持的语言
 */
console.log(Prism.allLanguages)

/**
 * 检测语言是否被支持
 * 
 * @param {String} 被检测的语言字符串
 * 
 * @returns {Boolean} 
 */
console.log(Prism.hasLanguage('html'))

/**
 * 组件的相关配置
 * 
 * @param {Object}
 */
UmNoteConfig({
  /**
   * 权限配置-使页面可被编辑
   * 
   * @param {Function} next 继续下一步
   */
  editConfigure (next) { // 如果不想配置edit权限, 请不要设置editConfigure, 或者在editConfigure内部直接调用next()方法
    if (store.getters.isLogin) { // 如果用户已登录
      next()
    } else {
      alert(`Oh, no! You don't have 'edit' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-添加代码块
   * 
   * @param {Function} next 继续下一步
   */
  addConfigure (next) { // 如果不想配置add权限, 请不要设置addConfigure, 或者在addConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'add' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-删除代码块
   * 
   * @param {Function} next 继续下一步
   */
  removeConfigure (next) { // 如果不想配置remove权限, 请不要设置removeConfigure, 或者在removeConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'remove' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-确认编辑的代码
   * 
   * @param {Function} next 继续下一步
   */
  submitConfigure (next) { // 如果不想配置submit权限, 请不要设置submitConfigure, 或者在submitConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'submit' permission! Please log in first!!!`)
    }
  },
  /**
   * 配置删除代码块弹框内的文字描述
   * 
   * {Object} contentNames
   * {String} contentNames.cancel 取消按钮描述
   * {String} contentNames.confirm 确定按钮描述
   * {String} contentNames.explain 弹框内容描述
   */
  contentNames: {
    cancel: '取消',
    confirm: '确定',
    explain: '确定删除?',
  },
  /**
   * 配置添加代码块时可选择的语言
   * 
   * {Array} languages
   * 你可以通过 console.log(Prism.allLanguages) 打印出所有被支持的语言, 返回一个数组
   * 你可以通过 console.log(Prism.hasLanguage(<languageName>)) 打印出 <languageName> 语言是否被支持, 返回 true 或 false
   */
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)'],
  /**
   * 配置主题
   * 
   * {String} theme
   * 可配置主题一共有8种: ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
   */
  theme: 'default',
})

createApp(App).use(store).use(UmNote).mount('#app')