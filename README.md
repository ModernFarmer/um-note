<br>

## um-note是基于[prismjs](https://prismjs.com/extending.html)开发的语法高亮vue3组件, 支持编辑和提交
<br>

## 完整demo -> **[Um-note Demo && Sound Code](https://github.com/ModernFarmer/um-note)**
<br>

![](https://pic.imgdb.cn/item/6119d4815132923bf86613b3.gif)
<br><br>

## \-\- 基本用法 \-\-
<br>

\- 下载依赖
```javascript
npm i um-note -S
```
<br>

\-&nbsp;&nbsp;&nbsp;注册组件
```javascript
// main.js
import { UmNote, UmNoteConfig } from 'um-note'

// UmNoteConfig是um-note组件的配置方法, 相当于初始化方法, 必须在Vue.use(UmNote)之前执行.
UmNoteConfig()

createApp(App).use(UmNote).mount('#app')
```
\* [UmNoteConfig 配置](#UmNoteConfig)
<br>

\-&nbsp;&nbsp;&nbsp;.vue文件中使用
```html
<template>
  <um-note :codes="code1"/>
</template>
```
```javascript
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const code = ref(`const helloWord = 'Hello, um-note!'`)

    return {
      code,
    }
  }
})
```
<br>

## \-\- 组件props \-\-
<br>

|参数|说明|类型|默认值|
|-|-|-|-|
|width|组件的宽度. *\*必须带单位.*|string|'100%'|
|height|组件的高度. *\*必须带单位.*|string|'auto'|
|editable|是否开启可编辑功能. 如果`editable`的值是false, 则隐藏组件右上角的编辑开关.|boolean|false|
|foldable|是否开启折叠功能. 如果`foldable`的值是false, 则`unfold`属性将失效, 组件将保持展开状态.|boolean|true|
|unfold|是否默认展开组件.|boolean|false|
|\*codes|需要展示的代码. [查看属性codes的格式](#codeFormat).|string \| object \| array|[]|
|language|组件的默认语言.|string|'javascript'|
<br>

### \-\-\- <a id="codeFormat">codes的格式</a> \-\-\-

|类型|格式|示例|
|-|-|-|
|string|-|\`const value = 'Hello Word!'\`|
|object|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: '' ]<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const value = 'Hello Word!'\`<br>}|
|array|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: '' ]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'html',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`\<div>{{ msg }}\<div>\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const msg = 'Hello Word!'\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|
<br>

## \-\- <a id="UmNoteConfig">UmNoteConfig 配置</a> \-\- &nbsp;&nbsp;\[[完整UmNoteConfig示例](#UmNoteConfig-example)\]

\- UmNoteConfig&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* *`UmNoteConfig必须在组件挂在之前被调用`*
<br>

|名称|类型|功能|回调参数|回调参数类型|回调参数说明|
|-|-|-|-|-|-|
|UmNoteConfig|function|配置um-note的主题、支持语言、权限等.|[Configure](#Configure)|object|UmNoteConfig方法的配置对象|
<br>

\-\- <a id="Configure">Configure</a>
<br>

|Configure的属性|类型|功能|默认值|回调参数|回调参数类型|回调参数说明|
|-|-|-|-|-|-|-|
|theme|string|配置um-note的主题. \[[所有主题](#theme)\]. \[[示例](#example-theme)\].|'default'|-|-|-|
|languages|array|配置um-note支持的语言. \[[所有可被支持的语言](#language)\]. \[[示例](#example-language)\]|['html', 'javascript', 'css']|-|-|-|
|contentNames|object|配置um-note中删除代码块弹框中的相关文字描述. \[[示例](#contentNames)|undefined|-|-|-|
|editConfigure|function|配置um-note中的编辑权限. \[[示例](#editConfigure)|undefined|`next`|function|继续下一步.|
|addConfigure|function|配置um-note中添加代码块权限. \[[示例](#addConfigure)|undefined|`next`|function|继续下一步.|
|removeConfigure|function|配置um-note中删除代码块权限. \[[示例](#removeConfigure)|undefined|`next`|function|继续下一步.|
|submitConfigure|function|配置um-note中的提交权限. \[[示例](#submitConfigure)|undefined|`next`|function|继续下一步.|
<br>

### $ - 配置示例
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- 配置主题
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="theme">所有支持的主题</a>

```javascript
// 本组件一共可支持8中主题, 分别是: 'default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight'
// 可通过全局属性Prism.allThemes来获取所有支持的主题
console.log(Prism.allThemes) // ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-theme">主题配置示例</a>

```javascript
UmNoteConfig({
  theme: 'okaidia'
})
```
----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- 配置语言
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="language">所有支持的语言</a>

```javascript
// 本组件一共可支持270+种语言
// 可通过全局属性Prism.allLanguages来获取所有支持的语言
console.log(Prism.allLanguages) // ['html', 'javascript', 'css', ...]

// 可通过全局方法Prism.hasLanguage来判断某种语言是否被支持
/**
 * 检测语言是否被支持
 * 
 * @param {String} 被检测的语言字符串
 * 
 * @returns {Boolean} 
 */
console.log(Prism.hasLanguage('html')) // true
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-language">语言配置示例</a>

```javascript
UmNoteConfig({
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)']
})
```
![](https://pic.imgdb.cn/item/611a42c85132923bf844d5b9.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="contentNames">配置删除文本</a>
<br>

```javascript
UmNoteConfig({
  contentNames: {
    cancel: 'cancel', // 取消按钮展示文本
    confirm: 'done', // 确定按钮展示文本
    explain: 'Are you sure to delete??', // 删除弹框内容展示文本
  }
})
```
![](https://pic.imgdb.cn/item/611a48045132923bf857090f.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="editConfigure">配置编辑权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置edit权限, 请不要设置editConfigure, 或者在editConfigure内部直接调用next()方法
  editConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="addConfigure">配置添加权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置add权限, 请不要设置addConfigure, 或者在addConfigure内部直接调用next()方法
  addConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="removeConfigure">配置删除权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置remove权限, 请不要设置removeConfigure, 或者在removeConfigure内部直接调用next()方法
  removeConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="submitConfigure">配置提交权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置submit权限, 请不要设置submitConfigure, 或者在submitConfigure内部直接调用next()方法
  submitConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="UmNoteConfig-example">完整UmNoteConfig配置</a>
<br>

```javascript
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
```

----------
<br>
